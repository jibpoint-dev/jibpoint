import Link from "next/link";

const Header = () => {
  return (
    <div className="self-stretch flex flex-col items-center justify-start py-0 px-6 text-left text-base text-white font-inter">
      <div className="w-full flex flex-col items-center justify-start relative max-w-[1120px]">
        <img
          className="absolute my-0 mx-[!important] top-[0px] left-[calc(50%_-_1758px)] w-[3516px] h-[1302px] object-cover z-[0]"
          alt=""
          src="/image/bg-stablep-2@2x.png"
        />
        <div className="self-stretch flex flex-row items-center justify-between py-4 px-0 z-[1] text-palevioletred">
          <img
            className="relative w-[98px] h-12 overflow-hidden shrink-0"
            alt=""
            src="/image/logo.png"
          />
          <Link href="/app">
            <div className="self-stretch flex flex-row items-center justify-center gap-[16px] cursor-pointer">
              <div className="rounded-80xl bg-royalblue-100 shadow-[0px_4px_8px_rgba(99,_115,_247,_0.25)] flex flex-row items-center justify-center py-4 px-8 gap-[16px] text-xl text-white">
                <span className="capitalize relative font-semibold">
                  Launch App
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start pt-40 px-0 pb-[433px] gap-[48px] z-[2] md:text-61xl xs:text-40xl">
          <div className="relative text-2xl font-black [text-shadow:0px_0px_20px_rgba(2,_100,_249,_0.4)]">
            <p className="m-0">Blockchain</p>
            <p className="m-0">Loyalty Point</p>
          </div>
          <div className="relative text-xl font-medium">
            For Real-world use cases
          </div>
        </div>
        <div className="flex self-auto flex-row flex-wrap items-start justify-center gap-3 z-[3] text-13xl">
          <div className="rounded-21xl lg:w-80 md:w-full lg:h-[340px] md:h-auto [background:linear-gradient(180deg,_rgba(16,_25,_34,_0.01)_46%,_rgba(13,_20,_28,_0.33))] shadow-[0px_2px_40px_rgba(0,_101,_255,_0.5)] overflow-hidden flex flex-row items-center justify-center">
            <div className="rounded-21xl flex flex-col items-center justify-start p-6 box-border gap-1">
              <img
                className="relative w-20 h-20 object-cover"
                alt=""
                src="/image/group-10@2x.png"
              />
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
                <b className="relative capitalize [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  <p className="m-0">{`STABILITY OF UT1`}</p>
                </b>
                <div className="flex-1 relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">
                  Unlock real-world utility with a stable-designed utility
                  token, elevating the Loyalty Program experience.
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-21xl lg:w-80 md:w-full lg:h-[340px] md:h-auto [background:linear-gradient(180deg,_rgba(16,_25,_34,_0.01)_46%,_rgba(13,_20,_28,_0.33))] shadow-[0px_2px_40px_rgba(0,_101,_255,_0.5)] h-[340px] overflow-hidden flex flex-row items-center justify-center">
            <div className="rounded-21xl flex flex-col items-center justify-start p-6 box-border gap-1">
              <img
                className="relative w-[73.9px] h-20 object-cover"
                alt=""
                src="/image/decentralizeapisdk-4@2x.png"
              />
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
                <b className="relative capitalize [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  GET MORE CUSTOMERS
                </b>
                <div className="flex-1 relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">
                  Attract new customers and win the hearts of existing ones more
                  effectively by implementing joint marketing initiatives with
                  leading brands.
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-21xl lg:w-80 md:w-full lg:h-[340px] md:h-auto [background:linear-gradient(180deg,_rgba(16,_25,_34,_0.01)_46%,_rgba(13,_20,_28,_0.33))] shadow-[0px_2px_40px_rgba(0,_101,_255,_0.5)] h-[340px] overflow-hidden flex flex-row items-center justify-center">
            <div className="rounded-21xl flex flex-col items-center justify-start p-6 box-border gap-1">
              <img
                className="relative w-20 h-20 object-cover"
                alt=""
                src="/image/mask-group@2x.png"
              />
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
                <b className="relative capitalize [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  <span className="text-amber-400 text-3xl font-bold font-['Inter'] capitalize">
                    HOLD
                  </span>
                  <span className="text-white text-3xl font-bold font-['Inter'] capitalize">
                    {" "}
                    to EARN POINTS
                  </span>
                </b>
                <div className="flex-1 relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">
                  <p className="m-0">
                    Simply holding JBC coins in our portfolio allows for easy
                    acquisition of JIB points (JBP), without the need for
                    traditional point system rental fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-full lg:w-[980px] h-52 lg:py-10 md:py-7 flex-col justify-start items-start inline-flex">
            <div className="self-stretch p-6 bg-opacity-20 rounded-3xl bg-blue-600  border border-solid	 border-blue-600 border-s shadow-[0px_2px_40px_rgba(0,_101,_255,_0.5)] justify-center items-start gap-2.5 inline-flex">
              <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch text-center text-white text-3xl font-bold font-['Inter'] capitalize">
                  BONUS
                </div>
                <div className="self-stretch text-center text-white text-base font-normal font-['Inter']">
                  Receive Potential (POT) coins throughout the duration of the
                  holding period.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
