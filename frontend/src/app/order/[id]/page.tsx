"use client";
import Head from "@/app/head";
import Loading from "@/components/custom/loading";
import MessageBox from "@/components/custom/message";
import {
  getOrderMutation,
  getPaypalClientID,
  putPayOrderMutation,
} from "@/components/hook/orderHooks";
import { ApiError } from "@/types/ApiError";
import { getError } from "@/utils/getError";
import { toast } from "react-toastify";
import {
  usePayPalScriptReducer,
  SCRIPT_LOADING_STATE,
  PayPalButtonsComponentProps,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import Button from "@/components/custom/button";

function getOrderId({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: order, isLoading, error, refetch } = getOrderMutation(id);

  const { mutateAsync: payOrder, isLoading: loadingPay } =
    putPayOrderMutation();
  const testPayHandler = async () => {
    await payOrder({ orderID: id });
    refetch();
    toast.success("Payment Successfully", { autoClose: 1000 });
  };
  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypalConfig } = getPaypalClientID();
  useEffect(() => {
    if (paypalConfig && paypalConfig.clientID) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypalConfig!.clientID,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };

      loadPaypalScript();
    }
  }, [paypalConfig]);
  const paypalButtonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    createOrder(data, actions) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: order!.totalPrice.toString(),
              },
            },
          ],
        })
        .then((paypalOrderID: string) => {
          return paypalOrderID;
        });
    },
    onApprove(data, actions) {
      return actions.order!.capture().then(async (details) => {
        try {
          await payOrder({ orderID: id, ...details });
          refetch();
          toast.success("Payment Successfully", { autoClose: 1000 });
        } catch (error) {
          toast.error(getError(error as ApiError));
        }
      });
    },
    onError: (error) => {
      toast.error(getError(error as ApiError));
    },
  };

  return (
    <div>
      <Head title={`Order: ${id}`} />
      {isLoading ? (
        <Loading.Order />
      ) : error ? (
        <MessageBox>{getError(error as ApiError)}</MessageBox>
      ) : (
        <div className="container">
          <div>
            <h3 className="font-bold text-lg mb-5">
              Number Of Order ID: ( <span className="h3">{id}</span> )
            </h3>
            <div className="grid lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2">
                <div className="p-5 rounded-lg border-2 mb-5 border-sky-700">
                  <h3 className="h3">Shipping</h3>
                  <div>
                    <p className="font-semibold">
                      Name: <span>{order?.shippingAddress.fullName}</span>{" "}
                    </p>
                    <p className="font-semibold mb-3">
                      Address:{" "}
                      <span>
                        {order?.shippingAddress.address},{" "}
                        {order?.shippingAddress.city},{" "}
                        {order?.shippingAddress.country},{" "}
                        {order?.shippingAddress.postalCode},
                      </span>
                    </p>
                  </div>
                  {order?.isDelivered ? (
                    <div className="p-5 bg-green-600 rounded-lg">
                      Is Delivered
                    </div>
                  ) : (
                    <div className="p-5 bg-rose-600 rounded-lg">
                      Not Delivered
                    </div>
                  )}
                </div>

                <div className="p-5 rounded-lg border-2 mb-5 border-sky-700">
                  <h3 className="h3">Payment</h3>
                  <div>
                    <p className="font-semibold mb-3">
                      Method: <span>{order?.paymentMethod}</span>{" "}
                    </p>
                  </div>
                  {order?.isPaid ? (
                    <div className="p-5 bg-green-600 rounded-lg">Ispaid</div>
                  ) : (
                    <div className="p-5 bg-rose-600 rounded-lg">Unpaid</div>
                  )}
                </div>

                <div className="p-5 rounded-lg border-2 mb-5 border-sky-700">
                  <h3 className="h3">Item</h3>
                  {order?.orderItems.map((order) => (
                    <div key={order._id} className="grid lg:grid-cols-3">
                      <div className="flex items-center col-span-1 ">
                        <img
                          alt={order.name}
                          src={order.image}
                          className="h-14 w-20 p-2"
                        />
                        <p className="text-sm">{order.name}</p>
                      </div>

                      <div className="col-span-2 flex items-center justify-between p-2 ">
                        <p className="text-sm">{order.quantity} Qty</p>
                        <p className="text-sm">{order.price} Pcs</p>
                        <p className="text-sm">
                          $ {order.price * order.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="p-5 rounded-lg border-2 mb-5 border-sky-700">
                  <h3 className="h3">Order Summary</h3>
                  <div className="flex justify-between">
                    <p>Items :</p>
                    <p>$ {order?.itemPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping Price :</p>
                    <p>$ {order?.shippingPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tax Price :</p>
                    <p>$ {order?.taxPrice.toFixed(2)}</p>
                  </div>
                  <div className="my-5 w-full h-1 bg-yellow-500 rounded-lg" />
                  <div className="flex justify-between p-5 border-sky-700 border-2 rounded-lg mb-10">
                    <p>Total Order Price</p>
                    <p>$ {order?.totalPrice.toFixed(2)}</p>
                  </div>
                  {!order?.isPaid && (
                    <div>
                      {isPending ? (
                        <Loading.Spin />
                      ) : isRejected ? (
                        <MessageBox>{getError(error as ApiError)}</MessageBox>
                      ) : (
                        <div>
                          <PayPalButtons
                            {...paypalButtonTransactionProps}
                          ></PayPalButtons>
                          <Button
                            condition="on"
                            text="Just For Dev and Build"
                            onClickHandler={testPayHandler}
                          />
                        </div>
                      )}
                      {loadingPay && <Loading.Spin />}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default getOrderId;
