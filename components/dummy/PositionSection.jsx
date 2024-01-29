import React from "react";

const PositionSectionDummy = () => {
  return (
    <div className="rounded-lg bg-token-color-contrainer-dark md:w-[369px] xs:w-full overflow-hidden shrink-0 flex flex-col items-start justify-start p-6 box-border gap-[24px] text-right text-xs text-token-color-text-gray-medium font-medium">
      <div className="self-stretch flex flex-col items-start justify-start">
        <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
          <div className="flex-1 flex flex-col items-start justify-start">
            <div className="flex flex-col items-start justify-start gap-[4px]">
              <div className="flex flex-row items-center justify-start gap-[8px]">
                <img
                  className="relative w-5 h-5 object-cover"
                  alt=""
                  src="/image/token-pot.png"
                />
                <p className="relative leading-[150%] font-semibold text-left my-0">
                  POT Wallet Balance
                </p>
              </div>
              <div className="flex flex-row items-start justify-start gap-[4px] text-base text-token-color-text-white">
                <div className="flex flex-row items-start justify-start">
                  <div className="relative leading-[150%] font-semibold">
                    0.0000
                  </div>
                </div>
                <div className="relative font-semibold text-token-color-text-gray-drak">
                  POT
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start">
            <div className="flex flex-col items-start justify-start gap-[4px]">
              <div className="flex flex-row items-center gap-[8px]">
                <img
                  className="relative w-5 h-5 object-cover"
                  alt=""
                  src="/image/token-jbp.png"
                />
                <p className="relative leading-[150%] font-semibold my-0 text-left">
                  JBP Wallet Balance
                </p>
              </div>
              <div className="flex flex-row items-start justify-start gap-[4px] text-base text-token-color-text-white">
                <div className="flex flex-row items-start justify-start">
                  <div className="relative leading-[150%] font-semibold">
                    0.0000
                  </div>
                </div>
                <div className="relative font-semibold text-token-color-text-gray-drak">
                  JBP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch relative box-border h-px border-[1px] border-solid border-token-color-stroke-dark" />
      <div className="self-stretch flex flex-row items-start justify-start gap-[12px]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
          <div className="flex flex-row items-center justify-start gap-[8px]">
            <div className="relative font-semibold">Collateral Price</div>
          </div>
          <div className="relative text-base font-semibold text-token-color-text-white">
            $ 0.0000
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
          <div className="flex flex-row items-center justify-start gap-[8px]">
            <div className="relative font-semibold">Liquidation Price</div>
          </div>
          <div className="relative text-base font-semibold text-token-color-text-white">
            $ 0.0000
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start gap-[12px]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
          <div className="flex flex-row items-center justify-start gap-[8px]">
            <div className="relative font-semibold">Hold Limit</div>{" "}
          </div>
          <div className="flex flex-row items-start justify-start gap-[4px] text-base text-token-color-text-white">
            <div className="flex flex-row items-start justify-start">
              <div className="relative leading-[150%] font-semibold">
                0.0000
              </div>
            </div>
            <div className="relative font-semibold text-token-color-text-gray-drak">
              JBP
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
          <div className="flex flex-row items-center justify-start gap-[8px]">
            <div className="relative font-semibold">Liquidation Point</div>
          </div>
          <div className="relative text-base font-semibold text-token-color-text-white">
            0.0000
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionSectionDummy;
