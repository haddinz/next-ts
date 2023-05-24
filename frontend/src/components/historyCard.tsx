'use client'
import { Order } from "@/types/Order";
import React from "react";
import Hanger from "./custom/hanger";

function HistoryCard({ orderHistory }: { orderHistory: Order[] }) {
  return (
    <div className="grid sm:grid-cols-2">
      {orderHistory?.map((order) => (
        <div
          key={order._id}
          className="p-5 bg-slate-800 rounded-lg bg-opacity-30 shadow-lg"
        >
          <div className="flex justify-between items-center">
            <div>{order._id.substring(0, 6)}</div>
            {order.isDelivered ? (
              <div className="text-sm text-green-200 bg-green-800 rounded-lg p-2">
                {order.deliveredAt.substring(0, 10)}
              </div>
            ) : (
              <div className="text-sm text-rose-200 bg-rose-800 rounded-lg p-2">
                Not Yet Shipped
              </div>
            )}
          </div>
          <div className="my-5">
            <div>{order.createdAt.substring(0, 10)}</div>
            {order.orderItems.map((product) => (
              <span key={product._id}>
                <span>{product.name}, </span>
              </span>
            ))}
          </div>
          <div className="font-semibold flex justify-between items-center">
            <span>$ {order.totalPrice}</span>
            <Hanger link={`/order/${order._id}`}>Details</Hanger>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryCard;
