"use client";
import { Product } from "@/types/Product";
import React, { useContext } from "react";
import Button from "./custom/button";
import Rating from "./custom/rating";
import Link from "next/link";
import { Store } from "@/utils/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { convertCartProduct } from "@/utils/getCartProduct";
import { CartItems } from "@/types/Cart";

function ProductSlug({ product }: { product: Product }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = (item: CartItems) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      toast.warning("Product Out Of Stock");
      return;
    }
    dispatch({
      type: "ADD_CART_ITEMS",
      payload: { ...item, quantity },
    });
    toast.success("Product Added To Cart", {autoClose: 1000});
    router.push("/cart");
  };
  return (
    <div>
      <Link href="/" className="text-yellow-400 font-semibold">
        Back To Menu
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <img
            alt={product.name}
            src={product.image}
            className="md:max-w-[600px] md:h-[410px] shadow-lg mt-2"
          />
        </div>

        <div className="col-span-1">
          <h3 className="h3 p-2 border-b-2">{product.name}</h3>
          <h3 className="h3 p-2 border-b-2">$ {product.price}</h3>
          <div className="p-2 border-b-2">
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>
          <p className="p-2 text-base capitalize">{product.description}</p>
        </div>

        <div>
          <div className="border-2 rounded-lg">
            <div className="flex items-center justify-around">
              <p className="p-2">Price : </p>
              <h3 className="p-2">$ {product.price}</h3>
            </div>
            <div className="p-2">
              {product.countInStock === 0 ? (
                <Button text="Product Not Available" condition="off" />
              ) : (
                <Button
                  text="Add To Cart"
                  condition="on"
                  onClickHandler={() =>
                    addToCartHandler(convertCartProduct(product!))
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSlug;
