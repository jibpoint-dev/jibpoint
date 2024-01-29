// import React from "react";
import { React, useRef } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";

const DataSection = ({
  pptBalance,
  daiBalance,
  earnedTokens,
  borrowingYield,
  borrowBalance,
  collateralBalance,
  borrowLimit,
  coreAddress,
  coreAbi,
  isChanged,
}) => {
  const toastId = useRef(null);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const coreContract = new ethers.Contract(coreAddress, coreAbi, signer);

  const pending = () =>
    (toastId.current = toast.info("Transaction Pending...", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }));

  const success = () => {
    toast.dismiss(toastId.current);
    toast.success("Transaction Complete!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const error = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const limitAmount = +borrowLimit + +borrowBalance;

  const holdLimitUsed = +borrowBalance / (+limitAmount / +100);
  
  const claimTokens = async (e) => {
    if (earnedTokens > 0) {
      e.preventDefault();
      try {
        const tx = await coreContract.claimYield();
        pending();
        await tx.wait();
        success();
        isChanged();
      } catch (err) {
        error({ err }.err.reason);
      }
    }
  };

  return (
    <div className="self-stretch rounded-lg flex flex-row items-start justify-start p-8 gap-[32px] bg-[url('/frame-95891@3x.png')] bg-cover bg-no-repeat bg-right-top text-right text-xs text-token-color-text-gray-medium font-medium">
      <div className="w-[500px] flex flex-col items-start justify-start gap-[32px]">
        <div className="flex flex-col items-start justify-start">
          <b className="relative">Net APY</b>
          <div className="relative text-31xl text-token-color-text-secondary">
            {borrowingYield}%
          </div>
          <div className="self-stretch xs:grid-cols-1 md:flex md:flex-row items-start justify-start gap-[40px]">
            <div className="flex flex-row items-end justify-start gap-[24px]">
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-col items-start justify-start gap-[4px]">
                  <div className="flex flex-row items-center justify-start">
                    <div className="relative leading-[150%] font-semibold">
                      Earning
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-center gap-[8px] text-xl text-token-color-text-white">
                    <img
                      className="relative w-6 h-6 object-cover"
                      alt=""
                      src="/image/token-pot.png"
                    />
                    <div className="flex flex-row items-start justify-start">
                      <div className="relative leading-[150%] font-medium">
                        {earnedTokens}
                      </div>
                    </div>
                    <h2 className="m-0 relative text-inherit font-bold font-inherit text-token-color-text-gray-drak">
                      POT
                    </h2>
                  </div>
                </div>
              </div>
              {earnedTokens <= 0 ? (
                <button className="[border:none] py-0 px-[18px] bg-token-color-contrainer-light rounded-6xl h-8 overflow-hidden flex flex-row items-center justify-center box-border}">
                  <div className="relative text-xs font-medium text-token-color-text-white text-left">
                    Claim
                  </div>
                </button>
              ) : (
                <button
                  className="cursor-pointer [border:none] py-0 px-[18px] bg-token-color-contrainer-primary rounded-6xl h-8 overflow-hidden flex flex-row items-center justify-center box-border}"
                  onClick={claimTokens}
                  disabled={earnedTokens <= 0}
                >
                  <div className="relative text-xs font-medium text-token-color-text-white text-left">
                    Claim
                  </div>
                </button>
              )}
            </div>
            <div className="self-stretch relative box-border w-px overflow-hidden shrink-0 border-[1px] border-solid border-token-color-stroke-dark" />
            <div className="flex flex-col items-start justify-start xs:pt-10 md:pt-0">
              <div className="flex flex-col items-start justify-start gap-[4px]">
                <div className="flex flex-row items-center justify-start gap-[8px]">
                  <div className="flex flex-row items-start justify-start gap-[4px]">
                    <b className="relative leading-[150%]">Holding 0.3% fee</b>
                  </div>
                  <div className="group relative flex justify-center">
                    {/* TODO: Confirm style tooltips */}
                    {/* <div className="hidden group-hover:block absolute my-0 mx-[!important] bottom-2 left-3 rounded-[7px] bg-token-color-contrainer-medium box-border w-80 overflow-hidden flex flex-row items-center justify-start p-4 max-w-[360px] text-left text-[12px] text-token-color-text-gray-light font-noto-sans-thai border-[1px] border-solid border-token-color-stroke-dark">
                      <div className="flex-1 relative">
                        <p className="m-0">
                          เมื่อคุณนำเหรียญ JBC มา Hold กับ JIB Point
                          คุณจะได้รับ JBP 60% จากมูลค่าของ JBC ในขณะที่คุณ Hold
                          JBP อยู่นั้น คุณจะได้ Earn เหรียญ POT
                          ตลอดระยะเวลาที่คุณ Hold ไว้ หากคุณต้องการ JBC กลับคืน
                          คุณจะต้องนำเหรียญ JBP มา Repay ตามจำนวนที่คุณได้รับมา
                        </p>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="flex flex-row items-start justify-start gap-[8px] text-xl text-token-color-text-white">
                  <img
                    className="relative w-6 h-6 object-cover"
                    alt=""
                    src="/image/token-jbp.png"
                  />
                  <div className="flex flex-row items-start justify-start">
                    <div className="relative leading-[150%] font-medium">
                      {borrowBalance}
                    </div>
                  </div>
                  <h2 className="m-0 relative text-inherit font-bold font-inherit text-token-color-text-gray-drak">
                    JBP
                  </h2>
                </div>
                <div className="self-stretch relative text-sm font-medium text-left">
                  ~ {collateralBalance} JBC
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
          <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
            <div className="flex-1 flex flex-row items-start justify-start">
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-col items-start justify-start">
                  <div className="flex flex-row items-start justify-start gap-[8px]">
                    <div className="relative leading-[150%] font-semibold">
                      Hold limit Used:
                    </div>
                    <div className="flex flex-row items-start justify-start text-token-color-text-white">
                      <div className="relative leading-[150%] font-semibold">
                        {holdLimitUsed.toFixed(4)} %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-row items-center justify-end">
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-col items-start justify-start">
                  <div className="flex flex-row items-start justify-start gap-[8px]">
                    <div className="relative leading-[150%] font-semibold">
                      Limit :
                    </div>
                    <div className="relative leading-[150%] font-semibold text-token-color-text-white">
                      {limitAmount.toFixed(4)} JBP
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch relative rounded-8xs box-border h-2.5 overflow-hidden shrink-0 border-[1px] border-solid border-token-color-stroke-dark">
            <div
              style={{ width: `${holdLimitUsed}%` }}
              className={`absolute top-[0px] left-[0px] rounded-8xs bg-token-color-contrainer-primary w-[235px] h-2.5 overflow-hidden`}
            ></div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex-1 relative overflow-hidden" />
    </div>
  );
};

export default DataSection;
