//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../PointPlusCore.sol";

///@notice Mock of FusionCore contract for testing liquidate function
contract MockCore is PointPlusCore {

    constructor(PointPlusToken _baseAssetAddress, PointPlusToken _fusionAddress, address _aggregatorAddress) PointPlusCore(_baseAssetAddress, _fusionAddress, _aggregatorAddress){}

    ///@notice overriding the passedLiquidation modifier to mock the price of ETH. Let's anyone liquidate any borrow position.
    ///@dev ethPrice set to 0 to be able to get liquidated
    modifier passedLiquidation(address _borrower) override {
        uint ethPrice = 0;
        require((ethPrice * collateralBalance[_borrower]) <= calculateLiquidationPoint(_borrower), "Position can't be liquidated!");
        _;
    }

}