"use client";
import Head from "@/app/head";
import Hanger from "@/components/custom/hanger";
import Loading from "@/components/custom/loading";
import MessageBox from "@/components/custom/message";
import HistoryCard from "@/components/historyCard";
import HistoryTable from "@/components/historyTable";
import { useGetOrderQueryHistory } from "@/components/hook/orderHooks";
import { ApiError } from "@/types/ApiError";
import { getError } from "@/utils/getError";
import { Store } from "@/utils/store";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

function OrderHistory() {
  const router = useRouter();

  const { state } = useContext(Store);
  const { userInfo } = state;

  const { data: orderHistory, isLoading, error } = useGetOrderQueryHistory();

  useEffect(() => {
    if (!userInfo) {
      router.push("/user/signin");
    }
  }, [userInfo, router]);

  return (
    <div>
      <Head title="Order History" />
      {isLoading ? (
        <Loading.History />
      ) : error ? (
        <MessageBox>{getError(error as ApiError)}</MessageBox>
      ) : (
        <div className="container">
          <div className="overflow-auto shadow-lg rounded-lg hidden md:block">
            <HistoryTable orderHistory={ orderHistory! }/>
          </div>

          <div className="block md:hidden">
            <HistoryCard orderHistory={ orderHistory! } />
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
