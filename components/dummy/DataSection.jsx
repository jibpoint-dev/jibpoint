// import React from "react";
import { React, useRef } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";

const DataSection = () => {
  return (
    <div className="self-stretch rounded-lg flex flex-row items-start justify-start p-8 gap-[32px] bg-[url('/frame-95891@3x.png')] bg-cover bg-no-repeat bg-right-top text-right text-xs text-token-color-text-gray-medium font-medium">
      <div className="w-[500px] flex flex-col items-start justify-start gap-[32px]">
        <div className="flex flex-col items-start justify-start">
          <b className="relative">Net APY</b>
          <div className="relative text-31xl text-token-color-text-secondary">
            0.00 %
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
                  <div className="flex flex-row items-start justify-start gap-[8px] text-xl text-token-color-text-white">
                    <img
                      className="relative w-6 h-6 object-cover"
                      alt=""
                      src="/image/token-pot.png"
                    />
                    <div className="flex flex-row items-start justify-start">
                      <div className="relative leading-[150%] font-medium">
                        0.0000
                      </div>
                    </div>
                    <h2 className="m-0 relative text-inherit font-bold font-inherit text-token-color-text-gray-drak">
                      POT
                    </h2>
                  </div>
                </div>
              </div>
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
                          JBC อยู่นั้น คุณจะได้ Earn เหรียญ POT
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
                      0.0000
                    </div>
                  </div>
                  <h2 className="m-0 relative text-inherit font-bold font-inherit text-token-color-text-gray-drak">
                    JBP
                  </h2>
                </div>
                <div className="self-stretch relative text-sm font-medium text-left">
                  ~ 0.00 JBC
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex-1 relative overflow-hidden" />
    </div>
  );
};

export default DataSection;
