const { ethers, network } = require("hardhat");

const main = async () => {
  let baseAssetAddress;
  let aggregatorAddress;

  if (network.name === "hardhat") {
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    let baseAsset = await MockERC20.deploy();
    baseAssetAddress = baseAsset.address;
    aggregatorAddress = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e";
  } else if (network.name === "jbc") {
    aggregatorAddress = "0xA21B21fe4263Ef932D0359E1e733a54f1838f793";
  } else if (network.name === "polygon") {
    aggregatorAddress = "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0";
  }

  console.log(`Base asset address: ${baseAssetAddress}`);
  console.log(`Chainlink aggregator address ${aggregatorAddress}`);

  const PointPlusCoin = await ethers.getContractFactory("PointPlusCoin");
  const pointplusCoin = await PointPlusCoin.deploy();
  console.log(
    `PointPlusCoin   address: ${pointplusCoin.address}, deployer: ${pointplusCoin.signer.address}`
  );

  const FusionToken = await ethers.getContractFactory("PointPlusToken");
  const fusionToken = await FusionToken.deploy();
  console.log(
    `Fusion Token  address: ${fusionToken.address}, deployer: ${fusionToken.signer.address}`
  );

  const FusionCore = await ethers.getContractFactory("PointPlusCore");

  const fusionCore = await FusionCore.deploy(
    pointplusCoin.address,
    fusionToken.address,
    aggregatorAddress
  );
  console.log(
    `Fusion Core address: ${fusionCore.address}, deployer: ${fusionCore.signer.address}`
  );

  await pointplusCoin.transferOwnership(fusionCore.address);
  console.log(
    `PointPlusCoin  ownership transferred from ${fusionToken.signer.address} to ${fusionCore.address}`
  );

  await fusionToken.transferOwnership(fusionCore.address);
  console.log(
    `Fusion Token ownership transferred from ${fusionToken.signer.address} to ${fusionCore.address}`
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
