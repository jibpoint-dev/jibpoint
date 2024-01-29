import { Fragment } from "react";

import "react-toastify/dist/ReactToastify.css";

const ControlSectionDummy = () => {
  return (
    <Fragment>
      <div className="flex flex-row items-end justify-end gap-[12px] text-left text-base text-token-color-text-white font-medium">
        <button className="cursor-pointer rounded-6xl bg-token-color-contrainer-primary h-10 overflow-hidden flex flex-row items-center justify-center py-0 px-6 box-border gap-[10px]">
          <img
            className="relative w-6 h-6 object-cover"
            alt=""
            src="/coinhand.png"
          />
          <div className="relative font-medium text-white">Hold JBP</div>
        </button>
        <button className="cursor-pointer rounded-6xl bg-orange box-border h-10 overflow-hidden flex flex-row items-center justify-center py-0 px-6 gap-[10px] text-token-color-text-secondary border-[1px] border-solid border-token-color-text-secondary">
          <img
            className="relative w-6 h-6 object-cover"
            alt=""
            src="/repay.png"
          />
          <div className="relative font-medium">Repay</div>
        </button>
      </div>
    </Fragment>
  );
};

export default ControlSectionDummy;
