import ProductPage from "@/components/productPage";
import { Inter } from "next/font/google";
import Head from "./head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head />
      <ProductPage />
    </>
  );
}
