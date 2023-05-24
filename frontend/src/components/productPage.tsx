/* eslint-disable @next/next/no-img-element */
"use client";
import ProductItems from "@/components/productItems";
import { ApiError } from "@/types/ApiError";
import { getError } from "@/utils/getError";
import MessageBox from "./custom/message";
import Loading from "./custom/loading";
import { getQueryProduct } from "./hook/productHooks";
// import { useEffect, useReducer } from "react";
// import { APIClient } from "@/utils/getAPI";
// import axios from "axios";

// axios.defaults.baseURL =
//   process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/";

// type State = {
//   products: Product[];
//   loading: boolean;
//   error: string;
// };

// type Action =
//   | { type: "REQUEST" }
//   | {
//       type: "SUCCESS";
//       payload: Product[];
//     }
//   | { type: "FAIL"; payload: string };

// const inisialState: State = {
//   products: [],
//   loading: true,
//   error: "",
// };

// const reducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case "REQUEST":
//       return { ...state, loading: true };
//     case "SUCCESS":
//       return { ...state, products: action.payload, loading: false };
//     case "FAIL":
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

const ProductPage = () => {
  // const [{ loading, error, products }, dispatch] = useReducer<
  //   React.Reducer<State, Action>
  // >(reducer, inisialState);
  // const router = useRouter();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: "REQUEST" });
  //     try {
  //       const result = await APIClient.get("/api/products");
  //       dispatch({ type: "SUCCESS", payload: result.data });
  //     } catch (error) {
  //       dispatch({ type: "FAIL", payload: getError(error as ApiError) });
  //     }
  //   };

  //   fetchData();
  // }, []);

  const { data: products, isLoading, error } = getQueryProduct();

  return (
    <div className="w-full">
      {isLoading ? (
        <Loading.Product />
      ) : error ? (
        <MessageBox>{getError(error as ApiError)}</MessageBox>
      ) : (
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products!.map((product) => (
            <div key={product.slug}>
              <ProductItems product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
