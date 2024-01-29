const { expect } = require("chai");
const { ethers } = require("hardhat");

//Tests for PointPlusCore.sol contract
describe("Point Plus Core", () => {
  //Setting constant variables
  let owner;
  let alice;
  let bob;
  let ppCore;
  let ppToken;
  let mockBaseAsset;
  let mockCore;

  const baseAssetAmount = ethers.utils.parseEther("70000");
  const provider = ethers.provider;

  //Comment the first line and uncomment the second line to test on JBC mainnet
  const aggregatorAddress = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e";
  //const aggregatorAddress = "0xA21B21fe4263Ef932D0359E1e733a54f1838f793";

  //Runs before individual tests. Deploying contracts, minting Base Asset.
  beforeEach(async () => {
    const PointPlusCore = await ethers.getContractFactory("PointPlusCore");
    const PointPlusToken = await ethers.getContractFactory("PointPlusToken");
    const MockBaseAsset = await ethers.getContractFactory("MockERC20");
    const MockCore = await ethers.getContractFactory("MockCore");

    mockBaseAsset = await MockBaseAsset.deploy();

    [owner, bob, alice] = await ethers.getSigners();

    await Promise.all([
      mockBaseAsset.mint(owner.address, baseAssetAmount),
      mockBaseAsset.mint(bob.address, baseAssetAmount),
      mockBaseAsset.mint(alice.address, baseAssetAmount),
    ]);

    ppToken = await PointPlusToken.deploy();
    ppCore = await PointPlusCore.deploy(
      mockBaseAsset.address,
      ppToken.address,
      aggregatorAddress
    );

    await ppToken.transferOwnership(ppCore.address);

    mockCore = await MockCore.deploy(
      mockBaseAsset.address,
      ppToken.address,
      aggregatorAddress
    );
  });

  //Deployment test
  describe("Initialize", async () => {
    it("should deploy successfully", async () => {
      expect(await mockBaseAsset).to.be.ok;
      expect(await ppToken).to.be.ok;
      expect(await ppCore).to.be.ok;
    });
  });

  //Claim yield ($PPT) functionality and arithmetics tests
  describe("Claim Yield", async () => {
    beforeEach(async () => {
      let collatAmount = ethers.utils.parseEther("1");
      await ppCore.connect(alice).collateralize({ value: collatAmount });
      await mockBaseAsset.mint(ppCore.address, baseAssetAmount);

      let rawBorrowLimit = await ppCore.calculateBorrowLimit(alice.address);
      let borrowLimit = ethers.utils.formatEther(rawBorrowLimit);
      let borrowAmount = ethers.utils.parseEther((borrowLimit / 2).toString());
      await ppCore.connect(alice).borrow(borrowAmount);
    });

    it("should return time elapsed", async () => {
      let time = 31536000;
      let startingTime = await ppCore.startTime(alice.address);
      expect(Number(startingTime)).to.be.greaterThan(0);

      await ethers.provider.send("evm_increaseTime", [time]);
      await ethers.provider.send("evm_mine");

      expect(await ppCore.calculateYieldTime(alice.address)).to.eq(time);
    });

    it("should claim correct amount of tokens", async () => {
      let time = 31536000;
      await ethers.provider.send("evm_increaseTime", [time]);
      await ethers.provider.send("evm_mine");
      
      let expectedToEarn = ethers.utils.formatEther(
        await ppCore.calculateYieldTotal(alice.address)
      );
      
      await ppCore.connect(alice).claimYield();
      
      let earnedAmount = ethers.utils.formatEther(
        await ppToken.balanceOf(alice.address)
      );

      expect((+earnedAmount).toFixed(2)).to.eq((+expectedToEarn).toFixed(2));
    });

    it("should save yield earned after borrowing again", async () => {
      let time = 31536000;

      let rawBorrowLimit = await ppCore.calculateBorrowLimit(alice.address);
      let borrowLimit = ethers.utils.formatEther(rawBorrowLimit);
      let borrowAmount = ethers.utils.parseEther((borrowLimit / 3).toString());
      await ppCore.connect(alice).borrow(borrowAmount);

      await ethers.provider.send("evm_increaseTime", [time]);
      await ethers.provider.send("evm_mine");

      await ppCore.connect(alice).borrow(borrowAmount);

      let rawBalance = await ppCore.calculateYieldTotal(alice.address);
      let balance = Number(ethers.utils.formatEther(rawBalance));

      let expectedToEarn = ethers.utils.formatEther(
        await ppCore.calculateYieldTotal(alice.address)
      );

      expect(balance).to.be.closeTo(+expectedToEarn, 0.01);
    });

    it("should save yield earned after repaying", async () => {
      let time = 31536000;
      let withdrawAmount = await ppCore.borrowBalance(alice.address);

      await ethers.provider.send("evm_increaseTime", [time]);
      await ethers.provider.send("evm_mine");
      
      await mockBaseAsset
        .connect(alice)
        .approve(ppCore.address, withdrawAmount);

      await ppCore.connect(alice).repay(withdrawAmount);

      let rawBalance = await ppCore.calculateYieldTotal(alice.address);
      let balance = Number(ethers.utils.formatEther(rawBalance));

      let expectedToEarn = ethers.utils.formatEther(
        await ppCore.calculateYieldTotal(alice.address)
      );

      expect(balance).to.be.closeTo(+expectedToEarn, 0.01);
    });
  });

  //Collateralize asset funcionality tests
  describe("Collateralize asset", async () => {
    it("should colltaeralize asset", async () => {
      let collatAmount = ethers.utils.parseEther("1");

      await ppCore.connect(bob).collateralize({ value: collatAmount });

      expect(await ppCore.collateralBalance(bob.address)).to.eq(
        collatAmount
      );
      expect(await provider.getBalance(ppCore.address)).to.eq(collatAmount);
    });

    it("should collateralize asset multiple times", async () => {
      let collatAmount = ethers.utils.parseEther("1");

      await ppCore.connect(alice).collateralize({ value: collatAmount });
      await ppCore.connect(bob).collateralize({ value: collatAmount });
      await ppCore.connect(alice).collateralize({ value: collatAmount });

      expect(await ppCore.collateralBalance(alice.address)).to.eq(
        ethers.utils.parseEther("2")
      );
      expect(await ppCore.collateralBalance(bob.address)).to.eq(
        collatAmount
      );
      expect(await provider.getBalance(ppCore.address)).to.eq(
        ethers.utils.parseEther("3")
      );
    });

    it("should revert with amount 0 can't be collateralized", async () => {
      await expect(
        ppCore.connect(bob).collateralize({ value: 0 })
      ).to.be.revertedWith("Can't collaterlize JBC amount: 0!");
    });
  });

  //Withdraw Collateral functionality tests
  describe("Withdraw Colleteral", async () => {
    beforeEach(async () => {
      let collatAmount = ethers.utils.parseEther("3");

      await ppCore.connect(bob).collateralize({ value: collatAmount });
    });

    it("should withdraw collateral", async () => {
      let withdrawAmount = ethers.utils.parseEther("1");
      let expectedResult = ethers.utils.parseEther("2");
      let rawBeforeBalance = await provider.getBalance(bob.address);
      let beforeBalance = Number(ethers.utils.formatEther(rawBeforeBalance));

      await ppCore.connect(bob).withdrawCollateral(withdrawAmount);

      expect(await ppCore.collateralBalance(bob.address)).to.eq(
        expectedResult
      );
      expect(await provider.getBalance(ppCore.address)).to.eq(
        expectedResult
      );

      let rawAfterBalance = await provider.getBalance(bob.address);
      let afterBalance = Number(ethers.utils.formatEther(rawAfterBalance));

      expect(afterBalance).to.be.closeTo(beforeBalance + 1, 0.0001);
    });

    it("should withdraw collateral multiple times", async () => {
      let firstAmount = ethers.utils.parseEther("1");
      let secondAmount = ethers.utils.parseEther("2");

      await ppCore.connect(bob).withdrawCollateral(firstAmount);

      expect(await ppCore.collateralBalance(bob.address)).to.eq(
        ethers.utils.parseEther("2")
      );

      await ppCore.connect(bob).withdrawCollateral(secondAmount);

      expect(await ppCore.collateralBalance(bob.address)).to.eq(0);
    });

    it("should revert with not enough collateral to withdraw", async () => {
      let withdrawAmount = ethers.utils.parseEther("4");

      await expect(
        ppCore.connect(bob).withdrawCollateral(withdrawAmount)
      ).to.be.revertedWith("Not enough collateral to withdraw!");
    });
  });

  describe("Chainlink Price Feed", () => {
    it("Should be able to successfully get price of collateral asset", async function () {
      let collatAssetPrice = await ppCore.getCollatAssetPrice();
      expect(collatAssetPrice).not.be.null;
    });
  });

  describe("Borrow Base Asset", () => {
    beforeEach(async () => {
      let collatAmount = ethers.utils.parseEther("1");

      await ppCore.connect(alice).collateralize({ value: collatAmount });

      await mockBaseAsset.mint(ppCore.address, baseAssetAmount);
    });

    it("should calculate borrow limit", async () => {
      let rawCollatAssetPrice = await ppCore.getCollatAssetPrice();
      let collatAssetPrice = Number(rawCollatAssetPrice);
      let rawCollatBalance = await ppCore.collateralBalance(alice.address);
      let collatBalance = Number(ethers.utils.formatEther(rawCollatBalance));
      let expectedResult = (collatAssetPrice * collatBalance * 0.6) / 10 ** 8;

      let rawResult = await ppCore.calculateBorrowLimit(alice.address);
      let result = Number(ethers.utils.formatEther(rawResult));

      //closeTo +- 1 to account for ETH price fluctuations
      expect(result).to.closeTo(expectedResult, 1);
    });

    it("should borrow Base Asset", async () => {
      let rawBorrowLimit = await ppCore.calculateBorrowLimit(alice.address);
      let borrowLimit = ethers.utils.formatEther(rawBorrowLimit);
      let borrowAmount = ethers.utils.parseEther((borrowLimit / 2).toString());

      let beforeBalance = await mockBaseAsset.balanceOf(alice.address);

      expect(await ppCore.connect(alice).borrow(borrowAmount)).to.be.ok;

      expect(await ppCore.isBorrowing(alice.address)).to.eq(true);

      let borrowBalance = await ppCore.borrowBalance(alice.address);
      expect(borrowBalance).to.eq(borrowAmount);

      let afterBalance = await mockBaseAsset.balanceOf(alice.address);
      expect(afterBalance).to.eq(beforeBalance.add(borrowAmount));
    });

    it("should borrow multiple times", async () => {
      let rawBorrowLimit = await ppCore.calculateBorrowLimit(alice.address);
      let borrowLimit = ethers.utils.formatEther(rawBorrowLimit);
      let borrowAmount = ethers.utils.parseEther((borrowLimit / 3).toString());

      await ppCore.connect(alice).borrow(borrowAmount);
      expect(await ppCore.borrowBalance(alice.address)).to.eq(borrowAmount);

      await ppCore.connect(alice).borrow(borrowAmount);
      expect(await ppCore.borrowBalance(alice.address)).to.eq(
        borrowAmount.add(borrowAmount)
      );
    });

    it("should deduct borrow fees from collateral", async () => {
      let rawBorrowLimit = await ppCore.calculateBorrowLimit(alice.address);
      let borrowLimit = ethers.utils.formatEther(rawBorrowLimit);
      let borrowAmount = ethers.utils.parseEther((borrowLimit / 2).toString());
      let beforeBalance = await ppCore.collateralBalance(alice.address);
      let expectedResult = beforeBalance - beforeBalance * 0.003;

      await ppCore.connect(alice).borrow(borrowAmount);

      let rawAfterBalance = await ppCore.collateralBalance(alice.address);
      let afterBalance = Number(rawAfterBalance);

      expect(afterBalance).to.eq(expectedResult);
    });

    it("should revert with no JBC collateralized", async () => {
      await expect(ppCore.connect(bob).borrow(1)).to.be.revertedWith(
        "No JBC collateralized!"
      );
    });

    it("should revert with borrow amount > borrow limit", async () => {
      let borrowAmount = ethers.utils.parseEther("150000");
      await expect(
        ppCore.connect(alice).borrow(borrowAmount)
      ).to.be.revertedWith("Borrow amount exceeds borrow limit!");
    });
  });

  describe("Repay Base Asset", async () => {
    beforeEach(async () => {
      await mockBaseAsset.mint(ppCore.address, baseAssetAmount);
      await mockBaseAsset
        .connect(bob)
        .approve(ppCore.address, baseAssetAmount);

      let collatAmount = ethers.utils.parseEther("1");
      await ppCore.connect(bob).collateralize({ value: collatAmount });

      let rawBorrowLimit = await ppCore.calculateBorrowLimit(bob.address);
      let borrowLimit = ethers.utils.formatEther(rawBorrowLimit);
      let borrowAmount = ethers.utils.parseEther((borrowLimit / 2).toString());

      await ppCore.connect(bob).borrow(borrowAmount);
    });

    it("should repay amount", async () => {
      let borrowBalance = await ppCore.borrowBalance(bob.address);
      let repayAmount = borrowBalance.div(2);
      let beforeBalance = await mockBaseAsset.balanceOf(ppCore.address);

      expect(await ppCore.connect(bob).repay(repayAmount)).to.be.ok;

      expect(await ppCore.isBorrowing(bob.address)).to.eq(true);
      expect(await ppCore.borrowBalance(bob.address)).to.eq(repayAmount);

      let afterBalance = await mockBaseAsset.balanceOf(ppCore.address);
      expect(afterBalance).to.eq(beforeBalance.add(repayAmount));
    });

    it("should repay multiple times", async () => {
      let borrowBalance = await ppCore.borrowBalance(bob.address);
      let repayAmount = borrowBalance.div(3);

      await ppCore.connect(bob).repay(repayAmount);
      expect(await ppCore.borrowBalance(bob.address)).to.eq(
        borrowBalance.sub(repayAmount)
      );

      await ppCore.connect(bob).repay(repayAmount);
      expect(await ppCore.borrowBalance(bob.address)).to.eq(
        borrowBalance.sub(repayAmount.mul(2))
      );
    });

    it("shoud repay full amount", async () => {
      let borrowBalance = await ppCore.borrowBalance(bob.address);

      await ppCore.connect(bob).repay(borrowBalance);

      expect(await ppCore.isBorrowing(bob.address)).to.eq(false);
      expect(await ppCore.borrowBalance(bob.address)).to.eq(0);
    });

    it("should revert with insufficient funds", async () => {
      let balance = await mockBaseAsset.balanceOf(bob.address);
      await mockBaseAsset.connect(bob).transfer(alice.address, balance);

      await expect(ppCore.connect(bob).repay(1)).to.be.revertedWith(
        "Insufficient funds!"
      );
    });

    it("should revert with can't repay 0 or more that borrowed", async () => {
      let borrowBalance = await ppCore.borrowBalance(bob.address);
      let repayAmount = borrowBalance.add(1);

      await expect(
        ppCore.connect(bob).repay(repayAmount)
      ).to.be.revertedWith(
        "Can't repay amount: 0 or more than amount borrowed!"
      );

      await expect(ppCore.connect(bob).repay(0)).to.be.revertedWith(
        "Can't repay amount: 0 or more than amount borrowed!"
      );
    });
  });

  describe("Liquidate", async () => {
    beforeEach(async () => {
      let collatAmount = ethers.utils.parseEther("1");
      let rawBorrowLimit = await ppCore.calculateBorrowLimit(alice.address);
      let borrowLimit = ethers.utils.formatEther(rawBorrowLimit);
      let borrowAmount = ethers.utils.parseEther((borrowLimit / 2).toString());

      await mockBaseAsset.mint(ppCore.address, baseAssetAmount);
      await mockBaseAsset.mint(mockCore.address, baseAssetAmount);
      await ppCore.connect(alice).collateralize({ value: collatAmount });
      await ppCore.connect(alice).borrow(borrowAmount);
      await mockCore.connect(alice).collateralize({ value: collatAmount });
      await mockCore.connect(alice).borrow(borrowAmount);
    });

    it("should return liquidation point", async () => {
      let rawBorrowBalance = await ppCore.borrowBalance(alice.address);
      let borrowBalance = Number(rawBorrowBalance);
      let expectedResult = borrowBalance + borrowBalance * 0.1;

      let rawResult = await ppCore.calculateLiquidationPoint(alice.address);
      expect(Number(rawResult)).to.eq(expectedResult);
    });

    it("should liquidate position", async () => {
      let rawBeforeBalance = await provider.getBalance(bob.address);
      let beforeBalance = Number(ethers.utils.formatEther(rawBeforeBalance));
      let rawCollatBalance = await mockCore.collateralBalance(alice.address);
      let collatBalance = Number(ethers.utils.formatEther(rawCollatBalance));
      let expectedResult = beforeBalance + collatBalance * 0.0125;

      expect(await mockCore.connect(bob).liquidate(alice.address)).to.be.ok;

      expect(await mockCore.collateralBalance(alice.address)).to.eq(0);
      expect(await mockCore.borrowBalance(alice.address)).to.eq(0);
      expect(await mockCore.isBorrowing(alice.address)).to.eq(false);

      let rawAfterBalance = await provider.getBalance(bob.address);
      let afterBalance = Number(ethers.utils.formatEther(rawAfterBalance));

      expect(afterBalance).to.closeTo(expectedResult, 0.0001);
    });

    it("should revert with position can't be liquidated", async () => {
      await expect(
        ppCore.connect(bob).liquidate(alice.address)
      ).to.be.revertedWith("Position can't be liquidated!");
    });
  });
});
