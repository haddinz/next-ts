"use client";
import Head from "@/app/head";
import Loading from "@/components/custom/loading";
import MessageBox from "@/components/custom/message";
import { getQuerySlug } from "@/components/hook/productHooks";
import ProductSlug from "@/components/productSlug";
import { ApiError } from "@/types/ApiError";
import { Product } from "@/types/Product";
import { getError } from "@/utils/getError";
// import { Product } from "@/types/Product";
// import { APIClient } from "@/utils/getAPI";
// import { useEffect, useReducer } from "react";

function getProductDetailsSlug({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data: product, isLoading, error } = getQuerySlug(slug);
  const productSlug: Product = product!;
  return (
    <>
      <Head title={product?.name} />
      {isLoading ? (
        <Loading.Details />
      ) : error ? (
        <MessageBox>{getError(error as ApiError)}</MessageBox>
      ) : (
        <div className="container">
          <ProductSlug product={productSlug} />
        </div>
      )}
    </>
  );
}

export default getProductDetailsSlug;
