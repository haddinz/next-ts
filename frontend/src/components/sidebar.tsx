"use client";
import { useContext, useEffect, useState } from "react";
import Icon from "./custom/icon";
import Link from "next/link";
import { Store } from "@/utils/store";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    mode,
    cart,
  } = state;
  useEffect(() => {
    document.body.setAttribute("class", mode);
    localStorage.setItem("mode", mode);
  }, [mode]);
  const darkmodeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  return (
    <div className="z-50 text-right">
      <div className="flex items-center justify-end">
        <button className={`relative z-10 mr-7 ${isOpen && "text-white"}`}>
          {cart.cartItems.length > 0 && (
            <div className="h-5 w-5 flex justify-center items-center rounded-full bg-sky-600 absolute -top-3 -right-2 text-white text-xs">
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </div>
          )}
          <Icon.Cart />
        </button>
        <button onClick={darkmodeHandler} className="relative z-10 mr-7">
          {mode === "dark" ? <Icon.Sun /> : <Icon.Moon />}
        </button>
        {isOpen ? (
          <button onClick={() => setIsOpen(false)} className="relative z-10">
            <Icon.X />
          </button>
        ) : (
          <button onClick={() => setIsOpen(true)} className="relative z-10">
            <Icon.Hamburger />
          </button>
        )}
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={` text-white ${
          isOpen
            ? "fixed top-0 right-0 -translate-x-0 bg-gray-900 w-full h-[100vh] ease-in-out transition-all duration-700"
            : "fixed top-0 -right-[700px] bg-gray-900 w-full h-[100vh] ease-in-out transition-all duration-700 delay-700"
        }`}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`${
            isOpen
              ? "absolute top-24 right-8 w-64 h-32 transition-all duration-300 opacity-100"
              : "absolute top-24 right-8 w-64 h-32 transition-all duration-300 opacity-0"
          }`}
        >
          <div className="flex justify-end flex-col">
            {userInfo ? (
              <div className="flex flex-col space-y-4">
                <div className="cursor-pointer hover:text-sky-300 font-medium">
                  Hello {userInfo.name}
                </div>
                <Link
                  href="/user/profile"
                  className="cursor-pointer hover:text-sky-300 font-medium"
                >
                  Manage Profile
                </Link>
                <Link
                  href="/order/history"
                  className="cursor-pointer hover:text-sky-300 font-medium"
                >
                  Order Histori
                </Link>
                {userInfo?.isAdmin && (
                  <Link
                    href="admin"
                    className="cursor-pointer hover:text-sky-300 font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button className="py-3 px-5 bg-sky-900 hover:bg-sky-400 rounded">
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link href="/login">Login</Link>
                <Link href="/signup">Signup</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
