/* eslint-disable @next/next/no-img-element */
import { Product } from "@/types/Product";
import React, { useContext } from "react";
import Rating from "./custom/rating";
import Link from "next/link";
import Button from "./custom/button";
import { Store } from "@/utils/store";
import { CartItems } from "@/types/Cart";
import { convertCartProduct } from "@/utils/getCartProduct";
import { toast } from "react-toastify";

export default function ProductItems({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = (item: CartItems) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      toast.warning("Product Out In Stock");
      return;
    }
    dispatch({ type: "ADD_CART_ITEMS", payload: { ...item, quantity } });
    toast.success("Success Added To Cart", {autoClose: 1000});
  };
  return (
    <div className="p-5 mb-10 flex flex-col items-center">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="image cursor-pointer"
        />
      </Link>
      <h3 className="h3 my-2">{product.name}</h3>
      <h3 className="h3">$ {product.price}</h3>
      <div className="text-center">
        <Rating rating={product.rating} numReviews={product.numReviews} />
      </div>
      {product.countInStock === 0 ? (
        <Button text="Product Not Available" condition="off" />
      ) : (
        <Button
          text="Add To Cart"
          condition="on"
          onClickHandler={() => addToCartHandler(convertCartProduct(product!))}
        />
      )}
    </div>
  );
}
