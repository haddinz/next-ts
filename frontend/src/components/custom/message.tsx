import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

export default function MessageBox({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div className="flex flex-col h-[75vh] justify-center items-center">
      <h1 className="font-bold text-emerald-800 text-xl">
        Oops! There Was A Problem
      </h1>
      <p className="text-3xl lg:text-5xl font-bold mt-5 mb-20">{children}</p>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <button
          onClick={() => window.location.reload}
          className="py-3 px-6 bg-emerald-900 rounded-lg text-emerald-300 m-5 hover:scale-110"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="py-3 px-6 bg-gray-800 rounded-lg text-emerald-300 m-5 hover:scale-110"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
