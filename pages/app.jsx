import { ethers } from "ethers";
import Link from "next/link";
import { NavbarApp } from "../components/NavbarAppPage.jsx";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  fusionCoreAddress,
  fusionCoreAbi,
  fusionTokenAddress,
  fusionTokenAbi,
  daiAddress,
  daiAbi,
} from "../constants";

import DataSection from "../components/DataSection.jsx";
import ControlSection from "../components/ControlSection.jsx";
import CollateralSection from "../components/CollateralSection.jsx";
import PositionSection from "../components/PositionSection.jsx";

import DataSectionDummy from "../components/dummy/DataSection.jsx";
import ControlSectionDummy from "../components/dummy/ControlSection.jsx";
import CollateralSectionDummy from "../components/dummy/CollateralSection.jsx";
import PositionSectionDummy from "../components/dummy/PositionSection.jsx";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [pptBalance, setPPTBalance] = useState(0);
  const [daiBalance, setDaiBalance] = useState(0);
  const [earnedTokens, setEarnedTokens] = useState(0);
  const [borrowingYield, setBorrowingYield] = useState(0);
  const [borrowBalance, setBorrowBalance] = useState(0);
  const [collateralBalance, setCollateralBalance] = useState(0);
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [collateralPrice, setcollateralPrice] = useState(0);
  const [liquidationPoint, setLiquidationPoint] = useState(0);
  const [balanceInWallet, setBalanceInWallet] = useState(0);

  const [isChanged, setIsChanged] = useState(false);

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);

  const coreAddress =
    chainId in fusionCoreAddress ? fusionCoreAddress[chainId] : null;
  const tokenAddress =
    chainId in fusionTokenAddress ? fusionTokenAddress[chainId] : null;
  const baseAssetAddress = chainId in daiAddress ? daiAddress[chainId] : null;

  useEffect(() => {
    const getPPTBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(
        tokenAddress,
        fusionTokenAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawBalance = await tokenContract.balanceOf(address);
      const balance = Number.parseFloat(
        ethers.utils.formatEther(rawBalance)
      ).toFixed(4);
      setPPTBalance(balance);
    };
    const getDaiBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const daiContract = new ethers.Contract(baseAssetAddress, daiAbi, signer);
      const address = await signer.getAddress();
      const rawBalance = await daiContract.balanceOf(address);
      const balance = Number.parseFloat(
        ethers.utils.formatEther(rawBalance)
      ).toFixed(4);
      setDaiBalance(balance);
    };
    const getEarnedTokens = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawEarnedAmount = await coreContract.getEarnedPointPlusTokens(
        address
      );
      const earnedAmount = Number.parseFloat(
        ethers.utils.formatEther(rawEarnedAmount)
      ).toFixed(5);
      setEarnedTokens(earnedAmount);
    };
    const getBorrowingYield = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const rawAmount = await coreContract.getYield();
      const amount = Number.parseFloat(rawAmount).toFixed(2);
      setBorrowingYield(amount);
    };
    const getBorrowBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawAmount = await coreContract.getBorrowBalance(address);
      const amount = Number.parseFloat(
        ethers.utils.formatEther(rawAmount)
      ).toFixed(4);
      setBorrowBalance(amount);
    };
    const getCollateralBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawAmount = await coreContract.getCollateralBalance(address);
      const amount = Number.parseFloat(
        ethers.utils.formatEther(rawAmount)
      ).toFixed(4);
      setCollateralBalance(amount);
    };
    const getBorrowLimit = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawAmount = await coreContract.getBorrowLimit(address);
      const amount = Number.parseFloat(
        ethers.utils.formatEther(rawAmount)
      ).toFixed(4);
      setBorrowLimit(amount);
    };
    const getLiquidationPoint = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawAmount = await coreContract.getLiquidationPoint(address);
      const amount = Number.parseFloat(
        ethers.utils.formatEther(rawAmount)
      ).toFixed(4);
      setLiquidationPoint(amount);
    };
    const getcollateralPrice = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawAmount = await coreContract.getCollatAssetPrice();
      let amount = Number.parseFloat(ethers.utils.formatEther(rawAmount));
      amount = (amount * 1e8).toFixed(4);
      setcollateralPrice(amount);
    };

    const getBalanceInWallet = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      provider.getBalance(signer.getAddress()).then((balance) => {
        setBalanceInWallet(
          (
            Math.floor(
              Number.parseFloat(ethers.utils.formatEther(balance)) * 1000
            ) / 1000
          ).toFixed(4)
        );
      });
    };

    if (isWeb3Enabled && coreAddress) {
      getPPTBalance();
      getDaiBalance();
      getEarnedTokens();
      getBorrowingYield();
      getBorrowBalance();
      getCollateralBalance();
      getBorrowLimit();
      getLiquidationPoint();
      getcollateralPrice();
      getBalanceInWallet();
    }
  }, [isWeb3Enabled, coreAddress, tokenAddress, baseAssetAddress, isChanged]);

  return (
    <div>
      {!coreAddress && isWeb3Enabled ? (
        <div className="w-full h-5 py-6 bg-red-400 justify-center items-center gap-2.5 inline-flex">
          <div className="text-white text-base font-medium font-['Noto Sans Thai']">
            JIB Point is not supported on this network. Please switch to a
            supported network
          </div>
        </div>
      ) : null}
      <NavbarApp />
      <main className="relative w-full bg-token-color-contrainer-black flex flex-col items-center justify-center">
        <div className="w-full bg-token-color-contrainer-black overflow-hidden flex flex-col items-start justify-start min-w-[360px] max-w-[1920px]">
          <section className="self-stretch overflow-y-auto flex flex-col items-center justify-start pt-0 px-0 pb-6 box-border min-h-[792px] z-[1] text-left text-5xl text-token-color-text-white font-medium">
            {coreAddress ? (
              <div className="w-full overflow-hidden shrink-0 flex flex-col items-start justify-start py-6 px-0 box-border gap-[32px] max-w-[1024px] z-[0] text-left text-5xl text-token-color-text-white font-medium">
                <div className="self-stretch flex flex-wrap flex-row items-center justify-start gap-[32px]">
                  <h1 className="m-0 flex-1 relative text-inherit leading-[150%] font-normal font-inherit">
                    Dashboard
                  </h1>
                  <ControlSection
                    coreAddress={coreAddress}
                    coreAbi={fusionCoreAbi}
                    daiAddress={baseAssetAddress}
                    daiAbi={daiAbi}
                    borrowLimit={borrowLimit}
                    borrowBalance={borrowBalance}
                    daiBalance={daiBalance}
                    earnedTokens={earnedTokens}
                    isChanged={() => setIsChanged(!isChanged)}
                  />
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[24px] text-right text-xs text-token-color-text-gray-medium">
                  {/* <DataSection /> */}
                  <DataSection
                    pptBalance={pptBalance}
                    daiBalance={daiBalance}
                    earnedTokens={earnedTokens}
                    borrowingYield={borrowingYield}
                    borrowBalance={borrowBalance}
                    collateralBalance={collateralBalance}
                    borrowLimit={borrowLimit}
                    coreAddress={coreAddress}
                    coreAbi={fusionCoreAbi}
                    isChanged={() => setIsChanged(!isChanged)}
                  />
                  <div className="self-stretch xs:grid-cols-1 xs:space-y-5 md:space-y-0 md:flex md:flex-row items-start md:justify-start xs:justify-center gap-[24px] text-left text-token-color-text-gray-drak">
                    {/* <CollateralSection /> */}
                    <CollateralSection
                      collateralBalance={collateralBalance}
                      coreAddress={coreAddress}
                      coreAbi={fusionCoreAbi}
                      balanceInWallet={balanceInWallet}
                      isChanged={() => setIsChanged(!isChanged)}
                    />
                    {/* <PositionSection /> */}
                    <PositionSection
                      collateralBalance={collateralBalance}
                      collateralPrice={collateralPrice}
                      borrowLimit={borrowLimit}
                      liquidationPoint={liquidationPoint}
                      borrowBalance={borrowBalance}
                      pptBalance={pptBalance}
                      daiBalance={daiBalance}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full overflow-hidden shrink-0 flex flex-col items-start justify-start py-6 px-0 box-border gap-[32px] max-w-[1024px] z-[0] text-left text-5xl text-token-color-text-white font-medium">
                <div className="self-stretch flex flex-wrap flex-row items-center justify-start gap-[32px]">
                  <h1 className="m-0 flex-1 relative text-inherit leading-[150%] font-normal font-inherit">
                    Dashboard
                  </h1>
                  <ControlSectionDummy />
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[24px] text-right text-xs text-token-color-text-gray-medium">
                  {/* <DataSection /> */}
                  <DataSectionDummy />
                  <div className="self-stretch xs:grid-cols-1 xs:space-y-5 md:space-y-0 md:flex md:flex-row items-start md:justify-start xs:justify-center gap-[24px] text-left text-token-color-text-gray-drak">
                    {/* <CollateralSection /> */}
                    <CollateralSectionDummy />
                    {/* <PositionSection /> */}
                    <PositionSectionDummy />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      {/* <footer className="flex flex-col items-center"> */}
      <footer className=" bg-token-color-contrainer-black inset-x-0 bottom-0 self-stretch overflow-y-auto flex flex-col items-center justify-center z-[0] text-right text-base text-token-color-text-gray-drak font-medium">
        <div className="w-full overflow-hidden shrink-0 flex flex-col items-start justify-start py-6 px-0 box-border gap-[24px] max-w-[1024px] z-[0]">
          <div className="self-stretch relative box-border h-px border-[1px] border-solid border-token-color-stroke-dark" />
          <div className="self-stretch flex flex-row items-center justify-center gap-[24px]">
            <div className="relative">
              © 2024 JIB Point. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      {/* </footer> */}
    </div>
  );
}
