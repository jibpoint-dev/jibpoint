import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="xl:px-60 self-stretch overflow-hidden flex flex-col items-center justify-start py-0 px-6 text-center text-sm text-white font-inter">
      <div className="w-full flex lex-row xs:flex-wrap-reverse items-center justify-between py-8 px-0 box-border">
        <div className="flex flex-col md:items-start md:justify-start xs:justify-center xs:items-center gap-[16px] xs:w-full md:w-96">
          <Image
            src="/image/logo.png"
            alt=""
            width={98}
            height={48}
            layout="fixed"
            className="relative w-[113.8px] h-12 overflow-hidden shrink-0"
          />
          <div className="relative">© 2024 JIB Point. All rights reserved.</div>
        </div>

        <div className="xs:w-full xs:pb-10 md:w-auto self-stretch flex flex-row items-center justify-center gap-[16px] text-left text-base text-palevioletred">
          <Link href="/app">
            <div className=" xs:w-full rounded-80xl bg-royalblue-100 shadow-[0px_4px_8px_rgba(99,_115,_247,_0.25)] flex flex-row items-center justify-center py-4 px-6 gap-[16px] xs:text-lg md:text-xl text-white cursor-pointer">
              <div className="relative font-semibold">
                <span className="capitalize">Launch App</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
