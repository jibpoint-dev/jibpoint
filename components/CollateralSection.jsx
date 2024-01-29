import { Fragment, useState, useRef, useEffect } from "react";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import Modal from "./Modal.jsx";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CollateralSection = ({
  collateralBalance,
  coreAddress,
  coreAbi,
  balanceInWallet,
  isChanged,
}) => {
  const [showCollateralize, setShowCollateralize] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [isPendingCollateralize, setIsPendingCollateralize] = useState(false);
  const [isPendingWithdraw, setIsPendingWithdraw] = useState(false);

  isPendingWithdraw;
  const [chainId, setChainId] = useState("");
  const { chainId: chainIdHex } = useMoralis();

  const toastId = useRef(null);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const coreContract = new ethers.Contract(coreAddress, coreAbi, signer);

  useEffect(() => {
    setChainId(parseInt(chainIdHex));
  }, [chainIdHex]);

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

  const collateralize = async (e) => {
    e.preventDefault();
    setIsPendingCollateralize(true);
    try {
      let amount = ethers.utils.parseEther(collatAmount);
      const tx = await coreContract.collateralize({ value: amount });
      pending();
      await tx.wait();
      setIsPendingCollateralize(false);
      success();
      setShowCollateralize(false);

      setDefaultCollat();
      isChanged();
    } catch (err) {
      error({ err }.err.reason);
      setIsPendingCollateralize(false);
    }
  };

  const withdraw = async (e) => {
    e.preventDefault();
    setIsPendingWithdraw(true);
    try {
      let amount = ethers.utils.parseEther(withdrawAmount);
      const tx = await coreContract.withdrawCollateral(amount);
      pending();
      await tx.wait();
      setIsPendingWithdraw(false);
      success();
      setShowWithdraw(false);
      setDefaultWithdraw();
      isChanged();
    } catch (err) {
      error({ err }.err.reason);
      setIsPendingWithdraw(false);
    }
  };

  // const [limitAmount, setLimitAmount] = useState(0);
  const [withdrawAmount, setWithDrawAmount] = useState(0);
  const handleChangeWithdraw = (event) => {
    // setLimitAmount(event.target.value);
    setWithDrawAmount(event.target.value);
  };

  const setDefaultWithdraw = () => {
    // setLimitAmount(0);
    setWithDrawAmount(0);
  };

  const setMaxWithdraw = () => {
    setWithDrawAmount(collateralBalance);
  };

  const [collatAmount, setCollatAmount] = useState(0);
  const handleChangeCollat = (event) => {
    // setLimitAmount(event.target.value);
    setCollatAmount(event.target.value);
  };

  const setDefaultCollat = () => {
    setCollatAmount(0);
  };

  const setMaxCollat = () => {
    // TODO: Change to set value from actual wallet
    setCollatAmount(balanceInWallet);
  };

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
                {collateralBalance}
              </div>
            </div>
          </div>

          <div className="flex flex-row items-start justify-start gap-[10px]">
            <button
              className="cursor-pointer rounded-xl bg-token-color-contrainer-light w-10 h-10 overflow-hidden shrink-0 flex flex-row items-center justify-center"
              onClick={() => setShowCollateralize(true)}
            >
              <img
                className="relative w-6 h-6 object-contain opacity-[0.9]"
                alt=""
                src="/addsquare02.png"
              />
            </button>
            <button
              className="cursor-pointer rounded-xl bg-token-color-contrainer-light w-10 h-10 overflow-hidden shrink-0 flex flex-row items-center justify-center"
              onClick={() => setShowWithdraw(true)}
            >
              <img
                className="relative w-6 h-6 object-contain opacity-[0.9]"
                alt=""
                src="/minus.png"
              />
            </button>
          </div>
        </div>
      </div>

      <Modal
        isVisible={showCollateralize}
        onClose={() => setShowCollateralize(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="rounded-6xl bg-token-color-contrainer-medium w-[462px] flex flex-col items-start justify-start p-6 box-border relative gap-[24px]">
              <div className="self-stretch relative text-center z-[0]">
                Collateralize JBC
              </div>
              <div className="self-stretch flex flex-col items-start justify-start z-[1] text-13xl">
                <div className="self-stretch flex flex-row items-center justify-start gap-[24px]">
                  <input
                    className="[border:none] [outline:none] font-noto-sans-thai text-[32px] bg-[transparent] flex-1 w-full relative text-token-color-text-white text-left inline-block"
                    placeholder="0"
                    type="number"
                    // ref={collatAmount}
                    onChange={handleChangeCollat}
                    value={collatAmount}
                  />
                  <div className="cursor-pointer rounded-6xl bg-token-color-contrainer-light h-8 overflow-hidden flex flex-row items-center justify-center py-0 px-[18px] box-border text-xs text-token-color-text-gray-light">
                    <div
                      className="relative font-medium"
                      onClick={setMaxCollat}
                    >
                      Max
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-row items-center justify-start gap-[8px] text-right text-sm text-token-color-text-gray-medium">
                  <img
                    className="relative rounded-11xl w-4 h-4 overflow-hidden shrink-0 object-cover"
                    alt=""
                    src="/image/token-jbc.png"
                  />
                  <div className="relative leading-[150%] font-medium">
                    {balanceInWallet}
                  </div>
                  <div className="relative leading-[150%] font-medium">
                    Wallet Available
                  </div>
                </div>
              </div>

              {/* TODO: Change to verify with actual amount */}
              {collatAmount > balanceInWallet && (
                <div className="relative text-sm leading-[150%] font-medium text-token-color-text-alert text-right">
                  Hold amount exceeds Wallet Balance
                </div>
              )}
              <div className="self-stretch relative text-sm leading-[150%] font-medium text-token-color-text-gray-medium z-[2]">
                Approval of JIB Point on the JBC contract is required before
                utilizing this asset. This process only needs to be completed
                once.
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[24px] z-[3] text-base text-token-color-text-gray-light">
                <div
                  className="flex-1 rounded-6xl bg-token-color-contrainer-light h-10 overflow-hidden flex flex-row items-center justify-center py-0 px-6 box-border gap-[10px] cursor-pointer"
                  onClick={() => {
                    setShowCollateralize(false);
                    setDefaultCollat();
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
                {!isPendingCollateralize ? (
                  <button
                    className={`[border:none] py-0 px-6 
                    ${
                      collatAmount > balanceInWallet || collatAmount === 0
                        ? "bg-token-color-contrainer-light"
                        : "cursor-pointer bg-token-color-contrainer-primary"
                    } 
                    flex-1 w-full relative rounded-[25px] h-10 overflow-hidden shrink-0 flex flex-row items-center justify-center box-border`}
                    disabled={
                      collatAmount > balanceInWallet || collatAmount === 0
                    }
                    onClick={collateralize}
                  >
                    <div
                      className={`relative text-[16px] font-medium font-noto-sans-thai 
                    ${
                      collatAmount > balanceInWallet || collatAmount === 0
                        ? "token-color-text-gray-light"
                        : "text-token-color-text-white"
                    } text-left`}
                    >
                      {`Collateralize`}
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
                // onClick={() => setShowCollateralize(false)}
                onClick={() => {
                  setShowCollateralize(false);
                  setDefaultCollat();
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

      <Modal isVisible={showWithdraw} onClose={() => setShowWithdraw(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="rounded-6xl bg-token-color-contrainer-medium w-[462px] flex flex-col items-start justify-start p-6 box-border relative gap-[24px]">
              <div className="self-stretch relative text-center z-[0]">
                Withdraw JBC
              </div>
              <div className="self-stretch flex flex-col items-start justify-start z-[1] text-13xl">
                <div className="self-stretch flex flex-row items-center justify-start gap-[24px]">
                  <input
                    className="[border:none] [outline:none] font-noto-sans-thai text-[32px] bg-[transparent] flex-1 w-full relative text-token-color-text-white text-left inline-block"
                    placeholder="0"
                    type="number"
                    onChange={handleChangeWithdraw}
                    value={withdrawAmount}
                  />
                  <div className="cursor-pointer rounded-6xl bg-token-color-contrainer-light h-8 overflow-hidden flex flex-row items-center justify-center py-0 px-[18px] box-border text-xs text-token-color-text-gray-light">
                    <div
                      className="relative font-medium"
                      onClick={setMaxWithdraw}
                    >
                      Max
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-row items-center justify-start gap-[8px] text-right text-sm text-token-color-text-gray-medium">
                  <img
                    className="relative rounded-11xl w-4 h-4 overflow-hidden shrink-0 object-cover"
                    alt=""
                    src="/image/token-jbc.png"
                  />
                  <div className="relative leading-[150%] font-medium">
                    {collateralBalance}
                  </div>
                  <div className="relative leading-[150%] font-medium">
                    Withdraw Collatera Available
                  </div>
                </div>
              </div>
              {/* TODO: POC validate withdraw before approve */}
              {withdrawAmount > collateralBalance && (
                <div className="relative text-sm leading-[150%] font-medium text-token-color-text-alert text-right">
                  Can’t withdraw collateral while Holding
                </div>
              )}
              <div className="self-stretch relative text-sm leading-[150%] font-medium text-token-color-text-gray-medium z-[2]">
                Approval of JIB Point on the JBC contract is required before
                utilizing this asset. This process only needs to be completed
                once.
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[24px] z-[3] text-base text-token-color-text-gray-light">
                <div
                  className="flex-1 rounded-6xl bg-token-color-contrainer-light h-10 overflow-hidden flex flex-row items-center justify-center py-0 px-6 box-border gap-[10px] cursor-pointer"
                  // onClick={() => setShowWithdraw(false)}
                  onClick={() => {
                    setShowWithdraw(false);
                    setDefaultWithdraw();
                  }}
                >
                  <img
                    className="relative w-6 h-6 hidden"
                    alt=""
                    src="/coinhand.png"
                  />
                  <div className="relative font-medium">Cancel</div>
                </div>
                {!isPendingWithdraw ? (
                  <button
                    className={`[border:none] py-0 px-6 
                    ${
                      withdrawAmount > collateralBalance || withdrawAmount == 0
                        ? "bg-token-color-contrainer-light"
                        : "bg-token-color-contrainer-primary cursor-pointer"
                    } 
                    flex-1 w-full relative rounded-[25px] h-10 overflow-hidden shrink-0 flex flex-row items-center justify-center box-border`}
                    disabled={
                      withdrawAmount > collateralBalance || withdrawAmount == 0
                    }
                    onClick={withdraw}
                  >
                    <div
                      className={`relative text-[16px] font-medium font-noto-sans-thai 
                    ${
                      withdrawAmount > collateralBalance || withdrawAmount == 0
                        ? "token-color-text-gray-light"
                        : "text-token-color-text-white"
                    } text-left`}
                    >
                      {`Withdraw`}
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
                // onClick={() => setShowWithdraw(false)}
                onClick={() => {
                  setShowWithdraw(false);
                  setDefaultWithdraw();
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
      <ToastContainer
        transition={Slide}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default CollateralSection;
