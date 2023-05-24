"use client";
import { useContext, useState } from "react";
import Icon from "./custom/icon";
import Link from "next/link";
import { Store } from "@/utils/store";

function Sidebar() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {isOpen ? (
        <button
          onClick={() => setIsOpen(false)}
          className="relative z-10 transition ease-in-out duration-500"
        >
          <Icon.X />
        </button>
      ) : (
        <button onClick={() => setIsOpen(true)} className="relative z-10">
          <Icon.Hamburger />
        </button>
      )}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed top-0 right-0 w-screen h-[100vh] transition ease-in-out duration-300 origin-right scale-x-0 -z-0 ${
          isOpen && "transform scale-x-100 bg-gray-900"
        }`}
      >
        <div
          className={`absolute top-0 right-0 text-white transition ease-in-out duration-700 origin-top scale-y-0 opacity-0 ${
            isOpen && "transform scale-y-100 opacity-100"
          }`}
        >
          <div className="w-36 flex flex-col justify-between items-end mr-[50px] mt-[30px]">
            <div className="flex cursor-pointer">
              <Link href="/cart" className="mr-14">
                <Icon.Cart />
              </Link>
            </div>
            {userInfo ? (
              <div className="mt-5">
                <button>{userInfo.name}</button>
              </div>
            ) : (
              <div>
                <Link href="/login" className="mt-5">
                  Login
                </Link>
                <Link href="/signup" className="mt-5">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
