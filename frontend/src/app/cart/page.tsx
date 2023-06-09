"use client";
import Head from "@/app/head";
import Button from "@/components/custom/button";
import Icon from "@/components/custom/icon";
import { CartItems } from "@/types/Cart";
import { Store } from "@/utils/store";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";

function Cart() {
  const searchParams = useSearchParams()?.get("redirect");
  const redirect = searchParams ? searchParams : "/cart/shipping";
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateHandler = (item: CartItems, quantity: number) => {
    if (item.countInStock < quantity) {
      toast.warning("Product Count In Stock");
    }
    dispatch({ type: "ADD_CART_ITEMS", payload: { ...item, quantity } });
  };
  const removeHandler = (item: CartItems) => {
    dispatch({ type: "REMOVE_CART_ITEMS", payload: item });
    toast.success("Remove Success", { autoClose: 1000 });
  };
  const checkOutHandler = () => {
    router.push(`user/signin?redirect=${redirect}`);
  };
  return (
    <div className="bg-sky-700 h-min[75vh] py-5">
      <Head title="Cart" />
      <div className="container text-white">
        <div className="text-center center font-bold text-2xl uppercase mb-10">
          Cart Page
        </div>
        {cartItems.length === 0 ? (
          <div className="h-44 flex justify-center items-center">
            <div>
              Cart Is Empty
              <Link href="/">
                <span className="text-yellow-200 font-semibold">
                  {" "}
                  Go To Product
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="col-span-2">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="grid col-span-1 md:grid-cols-2 gap-2 mb-10"
                  >
                    <div className="flex">
                      <div className="mb-5 relative">
                        <Link href={`/product/${item.slug}`}>
                          <img
                            alt={item.name}
                            src={item.image}
                            className="h-20 w-28"
                          />
                        </Link>
                        <button
                          className="absolute -top-3 left-24 text-gray-900"
                          onClick={() => removeHandler(item)}
                        >
                          <Icon.Times />
                        </button>
                      </div>
                      <div className="ml-10 text-sm md:text-lg">
                        <p className="font-semibold">{item.name}</p>
                        <p className="mb-5">$ {item.price}</p>
                        <p className="font-semibold ">
                          Product Total:{" "}
                          <span className="text-yellow-400">
                            $ {item.quantity * item.price}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center mb-10">
                      <button
                        className="mr-10"
                        onClick={() => updateHandler(item, item.quantity + 1)}
                        disabled={item.countInStock === item.quantity}
                      >
                        <Icon.Plus />
                      </button>
                      <p className="mr-10 font-semibold">{item.quantity}</p>
                      <button
                        onClick={() => updateHandler(item, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        className="mr-20"
                      >
                        <Icon.Minus />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pb-2 col-span-2 lg:col-span-1">
                <h3 className="pb-2 font-bold uppercase mb-5">Check Out</h3>
                <div className="border-b-4 border-lime-500 pb-10 mb-5">
                  <div className="flex justify-between">
                    Quantity Item:{" "}
                    <span className="font-semibold text-lg">
                      {cartItems.reduce((a, b) => a + b.quantity, 0)} PCS
                    </span>
                  </div>
                  <div className="flex justify-between">
                    Cart Total:{" "}
                    <span className="font-semibold text-lg">
                      ${" "}
                      {cartItems.reduce((a, b) => a + b.price * b.quantity, 0)}
                    </span>
                  </div>
                </div>
                <Button
                  text="Check Out"
                  condition="on"
                  onClickHandler={checkOutHandler}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
