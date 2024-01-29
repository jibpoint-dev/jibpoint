const { ethers, network } = require("hardhat");

const main = async () => {
  let baseAssetAddress;

  const ERC20 = await ethers.getContractFactory("PointPlusCoin");
  let baseAsset = await ERC20.deploy();
  baseAssetAddress = baseAsset.address;
  console.log(`PPC asset address: ${baseAssetAddress}`);

};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
