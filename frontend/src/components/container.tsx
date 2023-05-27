"use client";
import "../styles/globals.css";
import Footer from "./footer";
import Header from "./header";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import axios from "axios";

// axios.defaults.baseURL =
//   process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/";

function Container({ children }: { children: React.ReactNode }) {
  const queryCLient = new QueryClient();
  return (
    <>
      <PayPalScriptProvider options={{ "client-id": "sb" }} deferLoading={true}>
        <QueryClientProvider client={queryCLient}>
          <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <section className="mt-20">{children}</section>
            <Footer />
          </div>
        </QueryClientProvider>
      </PayPalScriptProvider>
    </>
  );
}

export default Container;
