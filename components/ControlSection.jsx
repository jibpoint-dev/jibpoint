import { Fragment, useState, useRef, useEffect } from "react";
import { ethers } from "ethers";
import Modal from "./Modal.jsx";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ControlSection = ({
  coreAddress,
  coreAbi,
  daiAddress,
  daiAbi,
  borrowLimit,
  borrowBalance,
  daiBalance,
  earnedTokens,
  isChanged,
}) => {
  const [showLend, setShowLend] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showBorrow, setShowBorrow] = useState(false);
  const [showRepay, setShowRepay] = useState(false);
  const [approvedLend, setApprovedLend] = useState(false);
  const [approvedRepay, setApprovedRepay] = useState(false);
  const [isPendingฺBorrow, setIsPendingฺBorrow] = useState(false);
  const [isPendingฺRepay, setIsPendingฺRepay] = useState(false);
  const [isClaimToken, setIsClaimToken] = useState(false);
  const [isPendingฺRepayApprove, setIsPendingฺRepayApprove] = useState(false);
  const [repayAmount, setRepayAmount] = useState(0);
  const [borrowAmount, setBorrowAmount] = useState(0);

  const lendAmount = useRef(0);
  const withdrawAmount = useRef(0);

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

  const approve = async (e, tokenAmount) => {
    e.preventDefault();
    setIsPendingฺRepayApprove(true);
    try {
      let amount = ethers.utils.parseEther(tokenAmount);
      const daiContract = new ethers.Contract(daiAddress, daiAbi, signer);
      const tx = await daiContract.approve(coreAddress, amount);
      pending();
      await tx.wait();
      success();
      setIsPendingฺRepayApprove(false);
    } catch (err) {
      error({ err }.err.reason);
      setIsPendingฺRepayApprove(false);
    }
    e.target.id === "lend" ? setApprovedLend(true) : setApprovedRepay(true);
  };

  const lend = async (e) => {
    e.preventDefault();
    try {
      let amount = ethers.utils.parseEther(lendAmount.current.value);
      let tx = await coreContract.lend(amount);
      pending();
      await tx.wait();
      success();
      setApprovedLend(false);
    } catch (err) {
      error({ err }.err.reason);
    }
    setShowLend(false);
  };

  const withdraw = async (e) => {
    e.preventDefault();
    try {
      let amount = ethers.utils.parseEther(withdrawAmount.current.value);
      const tx = await coreContract.withdrawLend(amount);
      pending();
      await tx.wait();
      success();
    } catch (err) {
      error({ err }.err.reason);
    }
    setShowWithdraw(false);
  };

  const borrow = async (e) => {
    e.preventDefault();
    setIsPendingฺBorrow(true);
    try {
      let amount = ethers.utils.parseEther(borrowAmount);
      const tx = await coreContract.borrow(amount);
      pending();
      await tx.wait();
      success();
      setIsPendingฺBorrow(false);
      setShowBorrow(false);
      setDefaultHoldSTB();
      isChanged();
    } catch (err) {
      error({ err }.err.reason);
      setIsPendingฺBorrow(false);
    }
  };

  const repay = async (e) => {
    e.preventDefault();
    setIsPendingฺRepay(true);
    try {
      let amount = ethers.utils.parseEther(repayAmount);
      const tx = await coreContract.repay(amount);
      pending();
      await tx.wait();
      success();
      setIsPendingฺRepay(false);
      setApprovedRepay(false);
      setDefaultRepay();
      isChanged();
    } catch (err) {
      error({ err }.err.reason);
      setIsPendingฺRepay(false);
    }
    setShowRepay(false);
  };

  const claimTokens = async (e) => {
    e.preventDefault();
    setIsClaimToken(true);
    try {
      const tx = await coreContract.claimYield();
      pending();
      await tx.wait();
      success();
      setIsClaimToken(false);
      isChanged();
    } catch (err) {
      error({ err }.err.reason);
      setIsClaimToken(false);
    }
  };

  const handleChangeHoldSTB = (event) => {
    setBorrowAmount(event.target.value);
  };

  const setDefaultHoldSTB = () => {
    setBorrowAmount(0);
  };

  const setMaxHoldSTB = () => {
    const borrowLimitWithTax = borrowLimit - borrowLimit * 0.03;
    setBorrowAmount(borrowLimitWithTax.toFixed(4));
  };

  const handleChangeRepay = (event) => {
    setRepayAmount(event.target.value);
  };

  const setDefaultRepay = () => {
    setRepayAmount(0);
  };

  const setMaxRepay = () => {
    setRepayAmount(borrowBalance);
  };

  return (
    <Fragment>
      <div className="flex flex-row items-end justify-end gap-[12px] text-left text-base text-token-color-text-white font-medium">
        <button
          className="cursor-pointer rounded-6xl bg-token-color-contrainer-primary h-10 overflow-hidden flex flex-row items-center justify-center py-0 px-6 box-border gap-[10px]"
          onClick={() => {
            setShowBorrow(true);
          }}
        >
          <img
            className="relative w-6 h-6 object-cover"
            alt=""
            src="/coinhand.png"
          />
          <div className="relative font-medium text-white">Hold JBP</div>
        </button>
        <button
          className="cursor-pointer rounded-6xl bg-orange box-border h-10 overflow-hidden flex flex-row items-center justify-center py-0 px-6 gap-[10px] text-token-color-text-secondary border-[1px] border-solid border-token-color-text-secondary"
          onClick={() => {
            setShowRepay(true);
          }}
        >
          <img
            className="relative w-6 h-6 object-cover"
            alt=""
            src="/repay.png"
          />
          <div className="relative font-medium">Repay</div>
        </button>
      </div>

      <Modal
        isVisible={showBorrow}
        onClose={() => {
          setShowBorrow(false);
        }}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="rounded-6xl bg-token-color-contrainer-medium w-[462px] flex flex-col items-start justify-start p-6 box-border relative gap-[24px]">
              <div className="self-stretch relative text-center z-[0]">
                Hold JBP
              </div>
              <div className="self-stretch flex flex-col items-start justify-start z-[1] text-13xl">
                <div className="self-stretch flex flex-row items-center justify-start gap-[24px]">
                  <input
                    className="[border:none] [outline:none] font-noto-sans-thai text-[32px] bg-[transparent] flex-1 w-full relative text-token-color-text-white text-left inline-block"
                    placeholder="0"
                    type="number"
                    name="borrowAmount"
                    defaultValue={0}
                    onChange={handleChangeHoldSTB}
                    value={borrowAmount}
                  />
                  <div className="cursor-pointer rounded-6xl bg-token-color-contrainer-light h-8 overflow-hidden flex flex-row items-center justify-center py-0 px-[18px] box-border text-xs text-token-color-text-gray-light">
                    <div
                      className="relative font-medium"
                      onClick={setMaxHoldSTB}
                    >
                      Max
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-row items-center justify-start gap-[8px] text-right text-sm text-token-color-text-gray-medium">
                  <img
                    className="relative rounded-11xl w-4 h-4 overflow-hidden shrink-0 object-cover"
                    alt=""
                    src="/image/StablePointCoin.png"
                  />
                  {/* TODO: Confirm display wallet balance */}
                  <div className="relative leading-[150%] font-medium">
                    {borrowLimit}
                  </div>
                  <div className="relative leading-[150%] font-medium">
                    Protocol Balance Available
                  </div>
                </div>
              </div>
              {borrowAmount > borrowLimit && (
                <div className="relative text-sm leading-[150%] font-medium text-token-color-text-alert text-right">
                  Hold amount exceeds Hold limit!
                </div>
              )}

              {/* TODO: Check hold amount with wallet balance */}
              <div className="self-stretch relative text-sm leading-[150%] font-medium text-token-color-text-gray-medium z-[2]">
                Approval of JIB Point on the JBC contract is required before
                utilizing this asset. This process only needs to be completed
                once.
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[24px] z-[3] text-base text-token-color-text-gray-light">
                <div
                  className="flex-1 rounded-6xl bg-token-color-contrainer-light h-10 overflow-hidden flex flex-row items-center justify-center py-0 px-6 box-border gap-[10px] cursor-pointer"
                  onClick={() => {
                    setShowBorrow(false);
                    setDefaultHoldSTB();
                  }}
                >
                  <img
                    className="relative w-6 h-6 hidden"
                    alt=""
                    src="/coinhand.png"
                  />
                  <div className="relative font-medium">Cancel</div>
                </div>
                {!isPendingฺBorrow ? (
                  <button
                    className={`[border:none] py-0 px-6 
                    ${
                      borrowAmount > borrowLimit || borrowAmount === 0
                        ? "bg-token-color-contrainer-light"
                        : "bg-token-color-contrainer-primary cursor-pointer"
                    } 
                    flex-1 w-full relative rounded-[25px] h-10 overflow-hidden shrink-0 flex flex-row items-center justify-center box-border`}
                    disabled={borrowAmount > borrowLimit || borrowAmount === 0}
                    onClick={borrow}
                  >
                    <div
                      className={`relative text-[16px] font-medium font-noto-sans-thai 
                    ${
                      borrowAmount > borrowLimit || borrowAmount === 0
                        ? "token-color-text-gray-light"
                        : "text-token-color-text-white"
                    } text-left`}
                    >
                      {`Hold JBP`}
                    </div>
                  </button>
                ) : (
                  <div className="flex-1 rounded-6xl bg-token-color-contrainer-light h-10 overflow-hidden flex flex-row items-center justify-center py-2 px-6 box-border text-token-color-text-gray-medium">
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-token-color-text-gray-drak"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    &nbsp;
                    <div className="relative font-medium">{`Pending`}</div>
                  </div>
                )}
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowBorrow(false);
                  setDefaultHoldSTB();
                }}
              >
                <img
                  className="absolute my-0 mx-[!important] top-[10px] right-[10px] w-6 h-6 z-[4]"
                  alt=""
                  src="/x-03.png"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isVisible={showRepay}
        onClose={() => {
          setShowRepay(false);
        }}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="rounded-6xl bg-token-color-contrainer-medium w-[462px] flex flex-col items-start justify-start p-6 box-border relative gap-[24px]">
              <div className="self-stretch relative text-center z-[0]">
                Repay JBP
              </div>
              <div className="self-stretch flex flex-col items-start justify-start z-[1] text-13xl">
                <div className="self-stretch flex flex-row items-center justify-start gap-[24px]">
                  <input
                    className="[border:none] [outline:none] font-noto-sans-thai text-[32px] bg-[transparent] flex-1 w-full relative text-token-color-text-white text-left inline-block"
                    placeholder="0"
                    type="number"
                    // ref={repayAmount}
                    onChange={handleChangeRepay}
                    value={repayAmount}
                  />
                  <div className="cursor-pointer rounded-6xl bg-token-color-contrainer-light h-8 overflow-hidden flex flex-row items-center justify-center py-0 px-[18px] box-border text-xs text-token-color-text-gray-light">
                    <div className="relative font-medium" onClick={setMaxRepay}>
                      Max
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-row items-center justify-start gap-[8px] text-right text-sm text-token-color-text-gray-medium">
                  <img
                    className="relative rounded-11xl w-4 h-4 overflow-hidden shrink-0 object-cover"
                    alt=""
                    src="/image/StablePointCoin.png"
                  />
                  <div className="relative leading-[150%] font-medium">
                    {daiBalance}
                  </div>
                  <div className="relative leading-[150%] font-medium">
                    Wallet Available
                  </div>
                </div>
              </div>
              {/* TODO: Confirm No Error message for Repay */}
              <div className="self-stretch relative text-sm leading-[150%] font-medium text-token-color-text-gray-medium z-[2]">
                Approval of JIB Point on the JBC contract is required before
                utilizing this asset. This process only needs to be completed
                once.
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[24px] z-[3] text-base text-token-color-text-gray-light">
                <div
                  className="flex-1 rounded-6xl bg-token-color-contrainer-light h-10 overflow-hidden flex flex-row items-center justify-center py-0 px-6 box-border gap-[10px] cursor-pointer"
                  onClick={() => {
                    setShowRepay(false);
                    setDefaultRepay();
                  }}
                >
                  <img
                    className="relative w-6 h-6 hidden"
                    alt=""
                    src="/coinhand.png"
                  />
                  <div className="relative font-medium">Cancel</div>
                </div>

                {/* TODO: Add condition for displaying pending text after click approve */}
                {earnedTokens > 0 ? (
                  !isClaimToken ? (
                    <button
                      className="[border:none] py-0 px-6 bg-token-color-contrainer-primary cursor-pointer flex-1 w-full relative rounded-[25px] h-10 overflow-hidden shrink-0 flex flex-row items-center justify-center box-border"
                      onClick={claimTokens}
                    >
                      <div className="relative text-[16px] font-medium font-noto-sans-thai text-token-color-text-white text-left">
                        {`Claim`}
                      </div>
                    </button>
                  ) : (
                    <div className="flex-1 rounded-6xl bg-token-color-contrainer-light h-10 overflow-hidden flex flex-row items-center justify-center py-2 px-6 box-border text-token-color-text-gray-medium">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-token-color-text-gray-drak"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      &nbsp;
                      <div className="relative font-medium">{`Pending`}</div>
                    </div>
                  )
                ) : null}

                {!approvedRepay && earnedTokens <= 0 ? (
                  !isPendingฺRepayApprove ? (
                    <button
                      className={`[border:none] py-0 px-6 
                    ${
                      repayAmount <= 0
                        ? "bg-token-color-contrainer-light"
                        : "bg-token-color-contrainer-primary cursor-pointer"
                    } 
                    flex-1 w-full relative rounded-[25px] h-10 overflow-hidden shrink-0 flex flex-row items-center justify-center box-border`}
                      disabled={repayAmount <= 0}
                      onClick={(event) => {
                        approve(event, repayAmount);
                      }}
                    >
                      <div
                        className={`relative text-[16px] font-medium font-noto-sans-thai 
                    ${
                      repayAmount <= 0
                        ? "token-color-text-gray-light"
                        : "text-token-color-text-white"
                    } text-left`}
                      >
                        {`Approve & Add`}
                      </div>
                    </button>
                  ) : (
                    <div className="flex-1 rounded-6xl bg-token-color-contrainer-light h-10 overflow-hidden flex flex-row items-center justify-center py-2 px-6 box-border text-token-color-text-gray-medium">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-token-color-text-gray-drak"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      &nbsp;
                      <div className="relative font-medium">{`Pending`}</div>
                    </div>
                  )
                ) : null}

                {approvedRepay && earnedTokens <= 0 ? (
                  !isPendingฺRepay ? (
                    <div
                      className="flex-1 rounded-6xl bg-token-color-contrainer-primary h-10 overflow-hidden flex flex-row items-center justify-center py-0 px-6 box-border text-token-color-text-white cursor-pointer"
                      onClick={repay}
                    >
                      <div className="relative font-medium">{`Repay`}</div>
                    </div>
                  ) : (
                    <div className="flex-1 rounded-6xl bg-token-color-contrainer-light h-10 overflow-hidden flex flex-row items-center justify-center py-2 px-6 box-border text-token-color-text-gray-medium">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-token-color-text-gray-drak"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      &nbsp;
                      <div className="relative font-medium">{`Pending`}</div>
                    </div>
                  )
                ) : null}
              </div>
              {/* TODO: Send close event to modal component */}
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowRepay(false);
                  setDefaultRepay();
                }}
              >
                <img
                  className="absolute my-0 mx-[!important] top-[10px] right-[10px] w-6 h-6 z-[4]"
                  alt=""
                  src="/x-03.png"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ControlSection;
