import { Fragment } from "react";
const CollateralSectionDummy = ({}) => {
  return (
    <Fragment>
      <div className="flex-1 rounded-lg bg-token-color-contrainer-dark overflow-hidden flex flex-col items-start justify-center p-6 gap-[24px] text-left text-xs text-token-color-text-gray-drak font-medium min-w-[300px] ">
        <div className="self-stretch flex flex-row items-start justify-start gap-[10px]">
          <div className="flex-1 relative font-medium">Collateral</div>
          <div className="flex-1 relative font-medium">
            Amount Collateralized
          </div>
          <div className="relative font-medium text-right inline-block w-[90px] shrink-0">
            Action
          </div>
        </div>
        <div className="self-stretch relative box-border h-px border-[1px] border-solid border-token-color-contrainer-light" />
        <div className="self-stretch flex flex-row items-start justify-start gap-[10px] text-base text-token-color-text-white">
          <div className="flex-1 flex flex-row items-center justify-start gap-[10px]">
            <img
              className="relative rounded-11xl w-6 h-6 overflow-hidden shrink-0 object-cover"
              alt=""
              src="/image/token-jbc.png"
            />
            <div className="flex-1 relative font-medium">JBC</div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="relative font-medium text-token-color-text-gray-drak">
                0.00
              </div>
            </div>
          </div>

          <div className="flex flex-row items-start justify-start gap-[10px]">
            <button className="cursor-pointer rounded-xl bg-token-color-contrainer-light w-10 h-10 overflow-hidden shrink-0 flex flex-row items-center justify-center">
              <img
                className="relative w-6 h-6 object-contain opacity-[0.9]"
                alt=""
                src="/addsquare02.png"
              />
            </button>
            <button className="cursor-pointer rounded-xl bg-token-color-contrainer-light w-10 h-10 overflow-hidden shrink-0 flex flex-row items-center justify-center">
              <img
                className="relative w-6 h-6 object-contain opacity-[0.9]"
                alt=""
                src="/minus.png"
              />
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CollateralSectionDummy;
