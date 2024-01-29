import Image from "next/image";
import { ethers } from "ethers";

const getTokenPrice = async () => {
  try {
    // const provider = new ethers.providers.JsonRpcProvider(
    //   "https://rpc-l1.jibchain.net"
    // );

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("provider", provider);
    const signer = provider.getSigner();
    const factoryAddress = "0x4bbda880c5a0cdcec6510f0450c6c8bc5773d499";
    const ethAddress = "0x99999999990FC47611b74827486218f3398A4abD";
    const tokenAddress = "0x999999999F7790f330Faa37457741d3e26A74659";
    const factoryABI = [
      "function getPair(address tokenA, address tokenB) external view returns (address pair)",
    ];
    const pairABI = ["function kLast() external view returns (uint)"];

    const factory = new ethers.Contract(factoryAddress, factoryABI, signer);
    const pairAddress = await factory.getPair(ethAddress, tokenAddress);
    console.log("pairAddress", pairAddress);
    const pair = new ethers.Contract(pairAddress, pairABI, signer);
    const price = await pair.kLast();
    const result = price;

    return result;
  } catch (error) {
    return error;
  }
};

console.log(getTokenPrice());

const Content = () => {
  return (
    <div className="self-stretch overflow-hidden flex flex-col items-center justify-start pt-0 px-6 relative text-left text-29xl text-gainsboro font-inter">
      <img
        className="absolute my-0 mx-[!important] top-[122px] left-[calc(50%_-_1758px)] w-[3516px] h-[990px] object-cover z-[0]"
        alt=""
        src="/image/frame-152@2x.png"
      />
      <div className="w-full flex flex-col items-center justify-start max-w-[1120px] z-[1]">
        <div className="self-stretch flex flex-wrap flex-row items-center justify-center py-20 px-0 gap-[80px] xs:hidden md:flex">
          <Image
            className="relative w-[400px] h-[378.9px] object-cover"
            alt=""
            width={400}
            height={378.9}
            layout="fixed"
            src="/image/group-13-1@2x.png"
          />
          <div className="flex flex-col items-start justify-start gap-[48px]">
            <b className="relative inline-block">
              <p className="m-0">{`Future of `}</p>
              <p className="m-0 text-royalblue-100">Loyalty Program</p>
            </b>
            <div className="self-stretch flex flex-col items-start justify-start gap-[53px] text-xl text-white">
              <div className="relative [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:6] [-webkit-box-orient:vertical] w-[568px] xs:w-[380px] hover:text-clip">
                Loyalty points will have more value than before. Unlock the
                limitations of point liquidity by trading through a blockchain
                system that allows you to allocate the value of points more
                effectively.
              </div>
              <div className="relative [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:6] [-webkit-box-orient:vertical] w-[568px] xs:w-[380px] hover:text-clip">
                Loyalty points that can do more than ever. Move beyond
                accumulation to help you discover new things with special deals
                from stores you may never have known or cherished rewards ready
                for you to claim.
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-wrap flex-row items-center justify-center py-20 px-0 gap-[80px] xs:flex md:hidden">
          <div className="flex flex-col items-start justify-start gap-[48px]">
            <b className="relative inline-block">
              <p className="m-0">{`Future of `}</p>
              <p className="m-0 text-royalblue-100">Loyalty Program</p>
            </b>
          </div>
          <Image
            className="relative w-[400px] h-[378.9px] object-cover"
            alt=""
            width={400}
            height={378.9}
            layout="fixed"
            src="/image/group-13-1@2x.png"
          />
          <div className="self-stretch flex flex-col items-start justify-start gap-[53px] text-xl text-white">
            <div className="relative [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:6] [-webkit-box-orient:vertical] w-[568px] xs:w-[380px] hover:text-clip">
              Loyalty points will have more value than before. Unlock the
              limitations of point liquidity by trading through a blockchain
              system that allows you to allocate the value of points more
              effectively.
            </div>
            <div className="relative [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:6] [-webkit-box-orient:vertical] w-[568px] xs:w-[380px] hover:text-clip">
              Loyalty points that can do more than ever. Move beyond
              accumulation to help you discover new things with special deals
              from stores you may never have known or cherished rewards ready
              for you to claim.
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-end justify-start text-white">
          <div className="flex flex-row flex-wrap self-stretch rounded-21xl bg-royalblue-300 shadow-[0px_4px_20px_rgba(2,_100,_249,_0.21)] box-border h-auto min-h-[179px]  items-start justify-center p-10 gap-[32px] border-[2px] border-solid border-royalblue-100">
            <div className="flex-1 flex flex-col">
              <b className="relative">
                <p className="m-0">{`Stable and `}</p>
                <p className="m-0">Tradable</p>
              </b>
            </div>
            <div className="flex-1 flex flex-row items-end justify-center text-9xl">
              <div className="xs:grid-cols-1 md:flex md:flex-row items-start justify-start gap-[16px] w-full">
                <div className="rounded-sm bg-royalblue-200 w-[303px] flex flex-col items-center justify-start">
                  <div className="self-stretch rounded-sm flex flex-row items-center justify-between p-4">
                    <div className="flex-1 relative font-medium">1</div>
                    <div className="rounded-2xl flex flex-row items-center justify-start p-3 gap-[10px] text-lg border-[1px] border-solid border-lavender">
                      <img
                        className="relative w-6 h-6 object-cover"
                        alt=""
                        src="/image/token-jbc.png"
                      />
                      <b className="relative leading-[13.3px]">JBC</b>
                      <img
                        className="relative w-6 h-6 overflow-hidden shrink-0"
                        alt=""
                        src="/image/frame.png"
                      />
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-center xs:rotate-90 md:rotate-0 ">
                  <img
                    className="rounded-xl w-8 h-8 object-contain"
                    alt=""
                    src="/image/frame-4@2x.png"
                  />
                </div>
                <div className="rounded-sm bg-royalblue-200 w-[303px] flex flex-col items-center justify-start">
                  <div className="self-stretch rounded-sm flex flex-row items-center justify-between p-4">
                    <div className="flex-1 relative font-medium">11.4322</div>
                    <div className="rounded-2xl flex flex-row items-center justify-start p-3 gap-[10px] text-lg border-[1px] border-solid border-lavender">
                      <img
                        className="relative w-6 h-6 object-cover"
                        alt=""
                        src="/image/token-jbp.png"
                      />
                      <b className="relative leading-[13.3px]">JBP</b>
                      <img
                        className="relative w-6 h-6 overflow-hidden shrink-0"
                        alt=""
                        src="/image/frame.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-wrap flex-row items-center justify-center py-10 px-0 gap-[80px]">
          <div className="self-stretch flex flex-wrap flex-row items-center justify-center py-2 px-0 gap-[80px] xs:hidden md:flex">
            <div className="flex flex-col items-start justify-start gap-[48px]">
              <b className="relative inline-block">
                <p className="m-0">{`Own your `}</p>
                <p className="m-0 text-amber-400">loyalty point pool</p>
              </b>
              <div className="self-stretch flex flex-col items-start justify-start gap-[53px] text-xl text-white">
                <div className="relative [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:6] [-webkit-box-orient:vertical] w-[568px] xs:w-[380px] hover:text-clip">
                  Create a Utility Token to serve as the Loyalty Points for the
                  brand, establishing a pool that is pegged to the value of JBP
                  coins. Distribute to customers without limitations through a
                  Blockchain system.
                </div>
              </div>
            </div>
            <img
              className="relative w-[400px] h-[378.9px] object-cover"
              alt=""
              src="/image/group-2.png"
            />
          </div>
          <div className="self-stretch flex flex-wrap flex-row items-center justify-center py-2 px-0 gap-[80px] xs:flex md:hidden">
            <div className="flex flex-col items-start justify-start gap-[48px]">
              <b className="relative inline-block">
                <p className="m-0">{`Own your `}</p>
                <p className="m-0 text-amber-400">loyalty point pool</p>
              </b>
              <img
                className="relative w-[400px] h-[378.9px] object-cover"
                alt=""
                src="/image/group-2.png"
              />
              <div className="self-stretch flex flex-col items-start justify-start gap-[53px] text-xl text-white">
                <div className="relative [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:6] [-webkit-box-orient:vertical] w-[568px] xs:w-[380px] hover:text-clip">
                  Create a Utility Token to serve as the Loyalty Points for the
                  brand, establishing a pool that is pegged to the value of JBP
                  coins. Distribute to customers without limitations through a
                  Blockchain system.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container flex flex-wrap items-center justify-center md:gap-36 xs:gap-28">
          {/* <Image
            height={80}
            width={126}
            className="relative w-32 h-[41px] object-cover"
            alt=""
            src="/image/logo-jib.png"
          /> */}
          <Image
            height={80}
            width={85}
            className="relative w-32 h-[33px] object-cover"
            alt=""
            src="/image/logo-bkk-gunpla-salon.png"
          />
          <Image
            height={80}
            width={80}
            className="relative w-[130px] h-[25px] object-cover"
            alt=""
            src="/image/logo-pa.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
