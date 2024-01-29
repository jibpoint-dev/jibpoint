import React from "react";

const HeroSection = () => {
  return (
    <section id="home" className="flex flex-col px-10 pt-72">
      <div className="flex flex-col items-start justify-center flex-1 px-6 xl:px-0">
        <div className="flex flex-row items-center py-[6px] px-4 rounded-[10px] mb-2"></div>
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="flex-1 font-semibold text-[42px] text-white text-shadow-white leading-[75px]">
            Point Plus Protocol
          </h1>
        </div>
        <h1 className="font-bold text-[42px] text-white leading-[75px] w-full text-shadow-white">
          Borrow Point, Earn Interest
        </h1>
        <p className="font-bold text-white text-shadow-white text-[18px] max-w-[470px] mt-5">
          A decentralized borrowing protocol. Borrow PPC and earn
          interest in PPT. Collaterlize JBC and borrow PPC in an
          overcollaterlized manner.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
