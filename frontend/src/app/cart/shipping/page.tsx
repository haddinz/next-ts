"use client";
import Head from "@/app/head";
import Button from "@/components/custom/button";
import CheckOutStep from "@/components/custom/checkoutStep";
import { Store } from "@/utils/store";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function ShippingPage() {
  const searchParams = useSearchParams()?.get("redirect");
  const redirect = searchParams ? searchParams : "/cart/payment";
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, cartItems },
  } = state;
  useEffect(() => {
    if (cartItems.length === 0 || !userInfo) {
      router.push("/");
    }
  }, [userInfo, cartItems]);

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  const submitShippingHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, country, postalCode },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        country,
        postalCode,
      })
    );

    router.push(redirect);
  };
  return (
    <div>
      <Head title="Shipping" />
      <CheckOutStep step1 step2 />
      <div className="container">
        <div className="mt-10 flex items-center flex-col">
          <div className="text-xl md:text-4xl font-bold text-cyan-600 mb-10">
            Shipping Address
          </div>
          <form onSubmit={submitShippingHandler} className="w-[450px]">
            <div className="mb-3 flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                className="px-4 py-2 mt-2 bg-cyan-700 rounded-lg"
                type="name"
                autoFocus
                required
                value={fullName}
                id="name"
                placeholder="Input full name"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label htmlFor="address">Address</label>
              <input
                className="px-4 py-2 mt-2 bg-cyan-700 rounded-lg"
                type="address"
                required
                value={address}
                id="address"
                placeholder="Input address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label htmlFor="country">Country</label>
              <input
                className="px-4 py-2 mt-2 bg-cyan-700 rounded-lg"
                type="country"
                required
                value={country}
                id="country"
                placeholder="Input country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                className="px-4 py-2 mt-2 bg-cyan-700 rounded-lg"
                type="postalCode"
                required
                value={postalCode}
                id="postalCode"
                placeholder="Input postal code"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="mb-10 flex flex-col">
              <label htmlFor="city">City</label>
              <input
                className="px-4 py-2 mt-2 bg-cyan-700 rounded-lg"
                type="city"
                required
                value={city}
                id="city"
                placeholder="Input city"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <Button text="Continue" condition="on" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShippingPage;

// redirect("/user/signin?callbackUrl=/cart/shipping");
