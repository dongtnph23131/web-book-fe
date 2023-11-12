import React from "react";
import { AppState } from "../context/AppProvider";
import { useGetProfileQuery } from "../api/auth";
import { useGetCartOfUserQuery } from "../api/cart";

const CheckoutFinal = () => {
  const { payment, setPayment, notes, token } = AppState();
  const { data: user, isLoading } = useGetProfileQuery(token);
  const { data: carts } = useGetCartOfUserQuery(token);
  return (
    <div>
      <div className="justify-center items-center mt-10">
        <div className="flex justify-between">
          <h3 className="font-mono text-2xl">{user?.user?.name}</h3>
          <h3>Hình thức thanh toán : {payment===1?'Thanh toán khi nhận hàng':"Thanh toán online"}</h3>
        </div>
        <br></br>
        <p className="font-mono text-xl">
          {user?.user?.numberHome} , Đường {user?.user?.road} ,
          {user?.user?.ward}
        </p>
        <p className="font-mono text-xl mt-5">
          {user?.user?.district} , {user?.user?.city} , Việt Nam
        </p>
        <p className="font-mono text-xl mt-5">0{user?.user?.phone}</p>
        <div className="border-b-slate-100 border mb-5"></div>
        Ghi chú giao hàng : {notes}
      </div>
      <h2 className="text-lg font-bold mb-10 mt-10">Your Cart Items</h2>
      {carts?.cart?.items?.map((item) => {
        return (
          <li key={item._id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img src={item?.productImage} />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <p>{item.name}</p>
                  </h3>
                  <p className="ml-4">$ {item.productPrice}</p>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Qty {item.quantity}</p>
                <div className="flex">
                  <p>Total : ${item.quantity * item.productPrice}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
      <div className="mt-5 flex justify-between">
        <h1 className="text-sm font-bold">Total</h1>
        <p className="text-lg text-gray-950">$ {carts?.cart?.total}</p>
      </div>
      <div className="flex justify-center items-center mt-10">
        <button className="w-[8rem] px-5 py-5 font-bold text-black bg-yellow-400 rounded-lg ml-5">
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default CheckoutFinal;
