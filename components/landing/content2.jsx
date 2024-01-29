import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

const Content2 = () => {
  return (
    <div className="self-stretch h-auto overflow-hidden shrink-0 flex flex-col items-center justify-start py-20 px-6 box-border bg-[url('/image/section-4@3x.png')] bg-cover bg-no-repeat bg-[top] text-center text-29xl text-white font-inter">
      <div className="w-full flex flex-col items-center justify-start max-w-[1120px]">
        <div className="self-stretch flex flex-col items-center justify-start gap-[24px]">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-row items-center justify-center py-6 px-2.5">
              <b className="relative">
                <p className="m-0">How to</p>
                <p className="m-0 text-royalblue-100">
                  <span className="text-royalblue-100">Get</span>
                  <span className="text-white">{` `}</span>
                  <span>JIB Point</span>
                </p>
              </b>
            </div>
          </div>
          <div className="self-stretch grid md:grid-cols-5 xs:grid-cols-1 flex-wrap flex-row items-center justify-center gap-[24px] text-left text-5xl">
            <div className="self-stretch flex-1 flex flex-col items-center justify-center pt-[30px] px-0 pb-0 gap-[24px]">
              <img
                className="relative w-[140px] h-[140px] object-cover"
                alt=""
                src="/image/frame-137@2x.png"
              />
              <div className="flex flex-col items-center justify-start gap-[16px]">
                <b className="relative capitalize [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] w-[106px]">
                  Mint JBC
                </b>
                <div className="relative text-xl text-center [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical] w-[247px]">
                  Then transfer to the wallet on the JIB Point website.
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-center xs:rotate-90 md:rotate-0">
              <img
                className="relative w-14 h-14"
                alt=""
                src="/image/arrowcircleright.png"
              />
            </div>
            <div className="self-stretch flex flex-row items-center justify-center">
              <div className="rounded-13xl bg-royalblue-500 box-border w-[321px] flex flex-col items-center justify-start pt-0 px-0 pb-8 border-[3px] border-solid border-royalblue-400">
                <div className="self-stretch flex flex-col items-center justify-start pt-8 px-0 pb-0 gap-[24px]">
                  <img
                    className="relative w-[140px] h-[140px] object-cover"
                    alt=""
                    src="/image/frame-136@2x.png"
                  />
                  <div className="flex flex-col items-center justify-start gap-[16px]">
                    <b className="relative capitalize [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] w-[113px]">
                      Hold JBC
                    </b>
                    <div className="relative text-xl text-center [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] w-[247px]">
                      In the portfolio to receive JIB Points.
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-center py-6 px-2.5">
                  <img
                    className="relative w-12 h-12"
                    alt=""
                    src="/image/arrowdown.png"
                  />
                </div>
                <div className="rounded-xl flex flex-col items-center justify-start py-0 px-4 gap-[24px] text-center">
                  <img
                    className="relative w-[220px] h-[220px] object-cover"
                    alt=""
                    src="/image/frame-134@2x.png"
                  />
                  <div className="flex flex-col items-center justify-start gap-[16px]">
                    <b className="relative capitalize [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] w-[136px]">
                      Get Bonus
                    </b>
                    <div className="relative text-xl [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical] w-[247px]">
                      Receive JIB Point coins for free through out the holding
                      period.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-center xs:rotate-90 md:rotate-0">
              <img
                className="relative w-14 h-14"
                alt=""
                src="/image/arrowcircleright.png"
              />
            </div>
            <div className="self-stretch flex-1 flex flex-col items-center justify-center pt-[30px] px-0 pb-0 gap-[24px] text-center">
              <img
                className="relative w-[140px] h-[140px] object-cover"
                alt=""
                src="/image/frame-134@2x.png"
              />
              <div className="self-stretch flex flex-col items-center justify-start gap-[16px]">
                <b className="self-stretch relative capitalize [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  <p className="m-0">JIB Point</p>
                  <p className="m-0">= Loyalty Point</p>
                </b>
                <div className="self-stretch relative text-xl [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                  Use points to attract customers and create new value.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-full flex flex-col items-center justify-start py-20 px-0 box-border gap-[64px] max-w-[1440px] text-left">
          <b className="w-full relative inline-block max-w-[1120px]">
            <span>{`Trending `}</span>
            <span className="text-royalblue-100">Rewards</span>
          </b>
          <div className="self-stretch flex flex-row items-center justify-center gap-[32px]">
            <Swiper
              breakpoints={{
                319: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
                720: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1025: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
              }}
            >
              <SwiperSlide>
                <img
                  src="/image/rectangle-25@2x.png"
                  alt=""
                  className="relative rounded-21xl w-full aspect-square object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/image/rectangle-31@2x.png"
                  alt=""
                  className="relative rounded-21xl w-full aspect-square object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/image/rectangle-32@2x.png"
                  alt=""
                  className="relative rounded-21xl w-full aspect-square object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/image/rectangle-33@2x.png"
                  alt=""
                  className="relative rounded-21xl w-full aspect-square object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <Image
            height={41}
            width={128}
            className="relative w-32 h-[41px] object-cover"
            alt=""
            src="/image/image-43@2x.png"
          />
          <Image
            height={33}
            width={128}
            className="relative w-32 h-[33px] object-cover"
            alt=""
            src="/image/image-44@2x.png"
          />
          <Image
            height={25}
            width={130}
            className="relative w-[130px] h-[25px] object-cover"
            alt=""
            src="/image/image-45@2x.png"
          />
          <Image
            height={58}
            width={128}
            className="relative w-32 h-[58px] object-cover"
            alt=""
            src="/image/image-46@2x.png"
          />
          <Image
            height={28}
            width={128}
            className="relative w-32 h-7 object-cover"
            alt=""
            src="/image/image-48@2x.png"
          />
          <Image
            height={46}
            width={128}
            className="relative w-32 h-[46px] object-cover"
            alt=""
            src="/image/image-49@2x.png"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Content2;
