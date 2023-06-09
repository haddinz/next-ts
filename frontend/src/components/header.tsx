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
    <div className="fixed w-full h-[80px] bg-gray-100 dark:bg-gray-900 z-10">
      <ToastContainer position="top-center" limit={1} />
      <div className="container dark:dark">
        <div className="grid grid-cols-2 sm:grid-cols-5 h-full">
          <div className="sm:col-span-3 flex items-center">
            <Link href="/" className="text-xl font-bold md:text-2xl">
              LOGO.ID
            </Link>
          </div>

          <div className="sm:col-span-2 my-auto">
            <nav className="block md:hidden">
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
                <div className="mr-5 relative cursor-pointer">
                  <div onClick={dropdownHandler}>Hello {userInfo.name}</div>
                  <div
                    onClick={() => setDropdown(!dropdrown)}
                    className={`${
                      dropdrown
                        ? `fixed top-0 left-0 w-full h-[100vh] bg-gray-900 bg-opacity-40`
                        : "hidden"
                    }`}
                  />
                  <div
                    onClick={() => setDropdown(!dropdrown)}
                    className={`${
                      dropdrown
                        ? `absolute p-5 bg-sky-700 rounded mt-5 right-0 w-64 flex flex-col`
                        : "hidden"
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
