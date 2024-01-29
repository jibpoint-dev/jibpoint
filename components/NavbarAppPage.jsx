import { ConnectButton } from "web3uikit";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

export const NavbarApp = () => {
  const [nav, setNav] = useState(false);

  return (
    <header className="bg-token-color-contrainer-black self-stretch flex flex-col items-center justify-start z-[2] text-left text-sm text-token-color-text-gray-medium font-medium">
      <nav className="w-full rounded-lg flex flex-row items-center justify-between py-4 px-0 box-border gap-[40px] max-w-[1024px] text-left text-sm text-token-color-text-gray-medium font-medium">
        <Link href="/">
          <div className="5self-stretch w-[100px] flex flex-col items-start justify-center cursor-pointer">
            <Image
              className="relative w-[80px] h-8 overflow-hidden shrink-0 object-cover"
              alt=""
              src="/Logo@2x.png"
              width={100}
              height={50}
            />
          </div>
        </Link>
        {/* <ul className="hidden md:flex">
          <li className="nav-links list-none px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline">
            <Link href="/app/#">
              <div className="flex flex-row items-center justify-center text-token-color-text-white">
                <div className="relative font-semibold cursor-pointer">
                  Dashboard
                </div>
              </div>
            </Link>
          </li>
          <li className="nav-links list-none px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline">
            <Link href="/app/#">
              <div className="flex flex-row items-center justify-center text-token-color-text-white">
                <div className="relative font-semibold cursor-pointer">
                  Market
                </div>
              </div>
            </Link>
          </li>
          <li className="nav-links list-none px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline">
            <Link href="/app/#">
              <div className="flex flex-row items-center justify-center text-token-color-text-white">
                <div className="relative font-semibold cursor-pointer">
                  Extensions
                </div>
              </div>
            </Link>
          </li>
          <li className="nav-links list-none px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline">
            <Link href="/app/#">
              <div className="flex flex-row items-center justify-center text-token-color-text-white">
                <div className="relative font-semibold cursor-pointer">
                  Vote
                </div>
              </div>
            </Link>
          </li>
        </ul> */}

        <div className="flex flex-row justify-end -ml-6">
          <ConnectButton moralisAuth={true} />
        </div>
      </nav>

      {/* <nav className="m-0 flex-1 flex flex-wrap flex-row items-center justify-start gap-[24px] text-left text-sm text-token-color-text-gray-medium font-medium">
          <div className="flex flex-row items-center justify-center text-token-color-text-white">
            <div className="relative font-semibold cursor-pointer">
              Dashboard
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className="relative font-semibold cursor-pointer">Market</div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className="relative font-semibold cursor-pointer">
              Extensions
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className="relative font-semibold cursor-pointer">Vote</div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <ConnectButton moralisAuth={true} />
          </div>
        </nav>
      </div> */}
    </header>
  );
};
