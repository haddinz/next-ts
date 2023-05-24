"use client";
import Head from "@/app/head";
import Button from "@/components/custom/button";
import Loading from "@/components/custom/loading";
import { useSignupMutation } from "@/components/hook/userHooks";
import { ApiError } from "@/types/ApiError";
import { getError } from "@/utils/getError";
import { Store } from "@/utils/store";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import axios from "axios";

function Signup() {
  const searchParams = useSearchParams()?.get('redirect')
  const redirect = searchParams ? searchParams : '/'
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [userInfo, redirect]);

  const {isLoading, mutateAsync: signup} = useSignupMutation()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      toast.warning("Password Dont Match", { autoClose: 1000 });
      return;
    }
    try {
      // const { data } = await axios.post("/api/users/register", {
      //   name,
      //   email,
      //   password,
      // });

      const data = await signup({name, email, password})
      dispatch({ type: "AUTH", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      router.push("/");
      toast.success("Successfully Create Account", { autoClose: 1000 });
    } catch (error) {
      toast.error(getError(error as ApiError), { autoClose: 1000 });
    }
  };
  return (
    <div>
      <Head title="Sign Up" />
      <div className="container">
        <div className="flex justify-center items-center flex-col mb-10 ">
          <h3 className="text-4xl font-bold text-cyan-700 mb-2">
            Welcome To Register Pages
          </h3>
          <p className="max-w-sm text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            euismod, lacus ac interdum sagittis{" "}
          </p>
        </div>
        <div className="flex items-center flex-col">
          <form className="w-[450px]" onSubmit={submitHandler}>
            <div className="mb-3 flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                className="px-4 py-2 mt-2 bg-cyan-700 rounded-lg"
                type="name"
                autoFocus
                required
                id="name"
                placeholder="Input Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="px-4 py-2 mt-2 bg-cyan-700 rounded-lg"
                type="email"
                required
                id="email"
                placeholder="Input Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="px-4 py-2 mt-2 bg-cyan-700 rounded-lg"
                type="password"
                required
                id="password"
                placeholder="Input Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-7 flex flex-col">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="px-4 py-2 mt-2 bg-cyan-700 rounded-lg"
                type="password"
                required
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="relative">
              <Button type="submit" text="Sign Up" condition="on" />
              {isLoading && (
                <div className="absolute top-2 left-10">
                  <Loading.Spin />
                </div>
              )}
            </div>
            <div className="mt-5">
              <span>
                Already Have An Account{" "}
                <Link href="/user/signin" className="text-yellow-400">
                  Signin
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
