//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PointPlusToken.sol";

///@notice Main Fusion Finance contract responsible for  collateralizing and borrowing
///@author John Nguyen (jooohn.eth)
contract PointPlusCore is Ownable {
    ///@notice events emitted after each action.
    event ClaimYield(address indexed borrower, uint256 amount);
    event Collateralize(address indexed borrower, uint256 amount);
    event WithdrawCollateral(address indexed borrower, uint256 amount);
    event Borrow(address indexed borrower, uint256 amount);
    event Repay(address indexed borrower, uint256 amount);
    event Liquidate(address liquidator, uint256 reward, address indexed borrower);

    mapping(address => uint256) public pptBalance;
    mapping(address => uint256) public startTime;

    ///@notice mappings needed to keep track of collateral and borrowing
    mapping(address => uint256) public collateralBalance;
    mapping(address => uint256) public borrowBalance;
    mapping(address => bool) public isBorrowing;

    ///@notice declaring chainlink's price aggregator.
    AggregatorV3Interface internal priceFeed;

    ///@notice declaring token variables.
    PointPlusToken public immutable baseAsset;
    PointPlusToken public immutable pointplusToken;
    address public vault;
    uint256 public yield = 50; // 50%

    uint256 constant public BORROW_LIMIT_PERCENT = 60; // 60% (1 = 1%)
    uint256 constant public LIQUIDATE_POINT_PERCENT = 30; // 30% (1 = 1%)

    uint256 constant public LIQUIDATE_FEE_PERCENT = 125; // 1.25% (100 = 1%)

    uint256 constant public BORROW_FEE_PERCENT = 3; // 0.3% (10 = 1%)

    uint256 constant public SECONDS_IN_YEAR = 31536000;

    ///@notice initiating tokens
    ///@param _baseAssetAddress address of base asset token
    ///@param _pptokenAddress address of $PPT token
    constructor(PointPlusToken _baseAssetAddress, PointPlusToken _pptokenAddress, address _aggregatorAddress) {
        baseAsset = _baseAssetAddress;
        pointplusToken = _pptokenAddress;
        priceFeed = AggregatorV3Interface(_aggregatorAddress);
        vault = msg.sender;
    }

    function setValut(address _valut) external onlyOwner {
        vault = _valut;
    }

    function setYield(uint256 _yield) external onlyOwner {
        yield = _yield;
    }

    ///@notice checks if the borrow position has passed the liquidation point
    ///@dev added 'virtual' identifier for MockCore to override
    modifier passedLiquidation(address _borrower) virtual {
        uint256 collatAssetPrice = getCollatAssetPrice();
        require(
            (collatAssetPrice * collateralBalance[_borrower]) / 1e8 <= calculateLiquidationPoint(_borrower),
            "Position can't be liquidated!"
        );
        _;
    }

    ///@notice Function to get latest price of JBC in USD
    ///@return collatAssetPrice price of JBC in USD
    function getCollatAssetPrice() public view returns (uint256 collatAssetPrice) {
        (, int256 price,,,) = priceFeed.latestRoundData();
        collatAssetPrice = uint256(price) * 100; //penny
    }

    ///@notice calculates amount of time the borrower has been borrowing since the last update.
    ///@param _borrower address of borrower
    ///@return borrowingTime amount of time staked by borrower
    function calculateYieldTime(address _borrower) public view returns (uint256 borrowingTime) {
        borrowingTime = block.timestamp - startTime[_borrower];
    }

    ///@notice calculates amount of $PPT tokens the borrower has earned since the last update.
    ///@dev rate = timeStaked / amount of time needed to earn 100% of $PPT tokens.
    ///@param _borrower address of borrower
    ///@return _yield amount of $PPT tokens earned by borrower
    function calculateYieldTotal(address _borrower) public view returns (uint256 _yield) {
        uint256 timeStaked = calculateYieldTime(_borrower);
        _yield = (borrowBalance[_borrower] * yield * timeStaked) / (100 * SECONDS_IN_YEAR);
    }

    ///@notice calculates the borrow limit depending on the price of JBC and borrow limit rate.
    ///@return limit current borrow limit for user
    function calculateBorrowLimit(address _borrower) public view returns (uint256 limit) {
        uint256 collatAssetPrice = getCollatAssetPrice();
        limit = ((((collatAssetPrice * collateralBalance[_borrower]) * BORROW_LIMIT_PERCENT) / 100)) / 1e8 - borrowBalance[_borrower];
    }

    function calculateLiquidationPoint(address _borrower) public view returns (uint256 point) {
        point = borrowBalance[_borrower] + (borrowBalance[_borrower] * LIQUIDATE_POINT_PERCENT) / 100;
    }

    ///@notice claims all yield earned by borrower.
    function claimYield() external {
        uint256 _yield = calculateYieldTotal(msg.sender);

        require(_yield > 0 || pptBalance[msg.sender] > 0, "No, $PPT tokens earned!");

        if (pptBalance[msg.sender] != 0) {
            uint256 oldYield = pptBalance[msg.sender];
            pptBalance[msg.sender] = 0;
            _yield += oldYield;
        }

        startTime[msg.sender] = block.timestamp;
        pointplusToken.mint(msg.sender, _yield);

        emit ClaimYield(msg.sender, _yield);
    }

    ///@notice collateralizes user's JBC and sets borrow limit
    function collateralize() external payable {
        require(msg.value > 0, "Can't collaterlize JBC amount: 0!");

        collateralBalance[msg.sender] += msg.value;

        emit Collateralize(msg.sender, msg.value);
    }

    ///@notice withdraw user's collateral JBC and recalculates the borrow limit
    ///@param _amount amount of JBC the user wants to withdraw
    function withdrawCollateral(uint256 _amount) external {
        require(collateralBalance[msg.sender] >= _amount, "Not enough collateral to withdraw!");
        require(!isBorrowing[msg.sender], "Can't withdraw collateral while borrowing!");

        collateralBalance[msg.sender] -= _amount;

        (bool success,) = msg.sender.call{value: _amount}("");
        require(success, "Transaction Failed!");

        emit WithdrawCollateral(msg.sender, _amount);
    }

    ///@notice borrows base asset
    ///@param _amount amount of base asset to borrow
    ///@dev deducting 0.3% from msg.sender's JBC collateral as protocol's fees
    function borrow(uint256 _amount) external {
        collateralBalance[msg.sender] -= (collateralBalance[msg.sender] * BORROW_FEE_PERCENT) / 1000;

        require(collateralBalance[msg.sender] > 0, "No JBC collateralized!");

        require(calculateBorrowLimit(msg.sender) >= _amount, "Borrow amount exceeds borrow limit!");
        if (isBorrowing[msg.sender]) {
            uint256 _yield = calculateYieldTotal(msg.sender);
            pptBalance[msg.sender] += _yield;
        }

        startTime[msg.sender] = block.timestamp;
        isBorrowing[msg.sender] = true;
        borrowBalance[msg.sender] += _amount;

        baseAsset.mint(msg.sender, _amount);
        (bool success,) = vault.call{value: (collateralBalance[msg.sender] * BORROW_FEE_PERCENT) / 1000}("");
        require(success, "Transaction Failed!");

        emit Borrow(msg.sender, _amount);
    }

    ///@notice repays base asset debt
    ///@param _amount amount of base asset to repay
    function repay(uint256 _amount) external {
        require(isBorrowing[msg.sender], "Can't repay before borrowing!");
        require(baseAsset.balanceOf(msg.sender) >= _amount, "Insufficient funds!");
        require(
            _amount > 0 && _amount <= borrowBalance[msg.sender], "Can't repay amount: 0 or more than amount borrowed!"
        );

        if (_amount == borrowBalance[msg.sender]) {
            isBorrowing[msg.sender] = false;
        }

        borrowBalance[msg.sender] -= _amount;

        require(baseAsset.transferFrom(msg.sender, address(this), _amount), "Transaction Failed!");

        emit Repay(msg.sender, _amount);
    }

    ///@notice liquidates a borrow position
    ///@param _borrower address of borrower
    ///@dev passedLiquidation modifier checks if the borrow position has passed liquidation point
    ///@dev liquidationReward 1.25% of borrower's JBC collateral
    function liquidate(address _borrower) external passedLiquidation(_borrower) {
        require(isBorrowing[_borrower], "This address is not borrowing!");
        require(msg.sender != _borrower, "Can't liquidated your own position!");

        uint256 liquidationReward = (collateralBalance[_borrower] * LIQUIDATE_FEE_PERCENT) / 10000;
        (bool success,) = vault.call{value: collateralBalance[_borrower] - liquidationReward}("");
        require(success, "Transaction Failed!");

        (bool lsuccess,) = msg.sender.call{value: liquidationReward}("");
        require(lsuccess, "Transaction Failed!");

        collateralBalance[_borrower] = 0;
        borrowBalance[_borrower] = 0;
        isBorrowing[_borrower] = false;
        emit Liquidate(msg.sender, liquidationReward, _borrower);
    }

    ///@notice retuns amount of $PPT tokens earned
    function getEarnedPointPlusTokens(address _borrower) external view returns (uint256) {
        return pptBalance[_borrower] + calculateYieldTotal(_borrower);
    }

    ///@notice returns amount of collateralized asset
    function getCollateralBalance(address _borrower) external view returns (uint256) {
        return collateralBalance[_borrower];
    }

    ///@notice returns borrowing status of borrower
    function getBorrowingStatus(address _borrower) external view returns (bool) {
        return isBorrowing[_borrower];
    }

    function getYield() external view returns (uint256) {
        return yield;
    }

    ///@notice returns amount of base asset borrowed
    function getBorrowBalance(address _borrower) external view returns (uint256) {
        return borrowBalance[_borrower];
    }

    ///@notice returns amount of base asset available to borrow
    function getBorrowLimit(address _borrower) external view returns (uint256) {
        return calculateBorrowLimit(_borrower);
    }

    ///@notice returns liquidation point
    function getLiquidationPoint(address _borrower) external view returns (uint256) {
        return calculateLiquidationPoint(_borrower);
    }
}
