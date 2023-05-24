"use client";
import Head from "@/app/head";
import Button from "@/components/custom/button";
import { useSigninMutation } from "@/components/hook/userHooks";
import { ApiError } from "@/types/ApiError";
import { getError } from "@/utils/getError";
import { Store } from "@/utils/store";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

function Signin() {
  const searchParams = useSearchParams()?.get('redirect')
  const redirect = searchParams ? searchParams : '/'
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const {mutateAsync, isLoading} = useSigninMutation()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      // const { data } = await axios.post("/api/users/signin", {
      //   email,
      //   password,
      // });

      const data = await mutateAsync({ email, password })
      dispatch({ type: "AUTH", payload: data });
      toast.success("Login Success", { autoClose: 1000 });
      router.push(redirect);
    } catch (error) {
      toast.error(getError(error as ApiError), { autoClose: 1000 });
    }
  };
  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [userInfo, redirect]);
  return (
    <div>
      <Head title="Sign In" />
      <div className="container">
        <div className="flex justify-center items-center flex-col mb-14 ">
          <h3 className="text-4xl font-bold text-cyan-700 mb-5">
            Welcome To Signin Pages
          </h3>
          <p className="max-w-sm text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            euismod, lacus ac interdum sagittis{" "}
          </p>
        </div>
        <div className="flex items-center flex-col">
          <form className="w-[450px]" onSubmit={submitHandler}>
            <div className="mb-3 flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="px-4 py-2 mt-2 bg-cyan-700 rounded-lg"
                type="email"
                autoFocus
                required
                value={email}
                id="email"
                placeholder="Input Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-7 flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="px-4 py-2 mt-2 bg-cyan-700 rounded-lg"
                type="password"
                required
                value={password}
                id="password"
                placeholder="Input Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="relative">
              <Button text="Sign Up" condition="on" />
            </div>
            <div className="mt-5">
              <span>
                Don't have an account{" "}
                <Link href={`/user/register?redirect=${redirect}`} className="text-yellow-400">
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
