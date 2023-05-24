"use client";
import { Store } from "@/utils/store";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Icon from "./custom/icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./sidebar";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const [dropdrown, setDropdown] = useState(false);
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("class", mode);
    localStorage.setItem("mode", mode);
  }, [mode]);

  const darkmodeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  const dropdownHandler = () => {
    setDropdown(!dropdrown);
  };

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT_AUTH" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    toast.success("Log Out Success", { autoClose: 1000 });
    window.location.href = "/user/signin";
  };

  return (
    <div className="w-full h-[80px]">
      <ToastContainer position="top-center" limit={1} />
      <div className="container dark:dark">
        <div className="grid grid-cols-2 sm:grid-cols-5 h-full">
          <div className="sm:col-span-4 flex items-center">
            <Link href="/" className="text-xl font-bold md:text-2xl">
              LOGO.ID
            </Link>
          </div>
          <div className="my-auto">
            <nav className="block md:hidden text-right">
              <Sidebar />
            </nav>
            <nav className="w-full hidden md:flex items-center justify-end font-bold">
              <Link href="/cart" className="mr-5 relative">
                {cart.cartItems.length > 0 && (
                  <div className="h-5 w-5 flex justify-center items-center rounded-full bg-sky-600 absolute -top-3 -right-2 text-white text-xs">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </div>
                )}
                <Icon.Cart />
              </Link>
              <span className="mr-5">||</span>
              {userInfo ? (
                <div className="mr-5 relative">
                  <button onClick={dropdownHandler}>Hello {userInfo.name}</button>
                  <div
                    onClick={() => setDropdown(!dropdrown)}
                    className={`absolute flex flex-col bg-sky-700 w-64 p-3 right-0 mt-5 rounded-lg transition origin-top duration-300 transform scale-y-0 border border-white border-opacity-70 ${
                      dropdrown && "scale-y-100"
                    }`}
                  >
                    <Link
                      className="hover:bg-sky-900 text-white p-2 rounded-lg"
                      href="/user/profile"
                    >
                      Manage Profile
                    </Link>
                    <Link
                      className="hover:bg-sky-900 text-white p-2 rounded-lg"
                      href="/order/history"
                    >
                      Order Histori
                    </Link>
                    {userInfo?.isAdmin && (
                      <Link
                        className="hover:bg-sky-900 text-white p-2 rounded-lg"
                        href="admin"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <div className="h-1 w-full bg-gray-900 my-5" />
                    <div
                      className="hover:bg-sky-900 text-white p-2 rounded-lg cursor-pointer"
                      onClick={logoutHandler}
                    >
                      Log Out
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Link href="/user/signin" className="mr-5">
                    LogIn
                  </Link>
                  <Link href="/user/register" className="mr-5">
                    SignUp
                  </Link>
                </div>
              )}
              <button onClick={darkmodeHandler}>
                <span>{mode === "dark" ? <Icon.Sun /> : <Icon.Moon />}</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
