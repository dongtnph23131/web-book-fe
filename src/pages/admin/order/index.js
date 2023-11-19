import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { AppState } from "../../../context/AppProvider";
import { useGetMyOrderQuery, useUpdateOrderMutation } from "../../../api/order";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "../../../components/Modal";
const nameStatus = (number) => {
  switch (number) {
    case 0:
      return "Chờ các nhận";
    case 1:
      return "Đã xác nhận";
    case 2:
      return "Đang giao hàng";
    case 3:
      return "Đã giao xong";
    case -1:
      return "Đã hủy";
  }
};
const OrderPageAdmin = () => {
  const [isShowCart, setIsShowCart] = useState(false);
  const onShowCart = () => {
    setIsShowCart(true);
  };
  const onHiddenCart = () => {
    setIsShowCart(false);
  };
  const [id, setId] = useState(JSON.parse(localStorage.getItem("user"))?._id);
  const [userId, setUserId] = useState(id);
  useEffect(() => {
    setUserId(id);
  }, [id]);
  const [isModal, setIsModal] = useState(false);
  const [updateOrder] = useUpdateOrderMutation();
  const hiddenModal = () => {
    setIsModal(false);
  };
  const [orderDetailId, setOrderDetailId] = useState();
  const { token } = AppState();
  const { data: myOrders, isLoading } = useGetMyOrderQuery(token);
  const dataSource = myOrders?.data?.map((item) => ({
    key: item._id,
    status: nameStatus(item.status),
    pay: item.pay ? "Đã thanh toán" : "Chưa thanh toán",
    total: item.totalOrder,
    idStatus: item.status,
    payments: item.payMent === "1" ? "Khi nhận hàng" : "Online",
  }));
  const columns = [
    {
      title: "OrderId",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "pay",
      key: "pay",
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
    },
    { title: "Hình thức thanh toán", dataIndex: "payments", key: "payments" },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Actions",
      key: "actions",
      render: (item) => {
        return (
          <div className="flex">
            {item.status === "Đã giao xong" || item.status === "Đã hủy" ? (
              ""
            ) : (
              <button
                onClick={async () => {
                  const { data: order } = await axios.get(
                    `http://localhost:8080/api/orders/${item.key}`
                  );
                  const orderUpdate = {
                    ...order.data,
                    pay: order.data.status === 2 ? true : false,
                  };
                  const confirm = window.confirm(
                    `Bạn có chắc chắn cập nhập trạng thái đơn hàng thành ${nameStatus(
                      Number(item.idStatus) + 1
                    )}`
                  );
                  if (confirm) {
                    const data = await updateOrder({
                      ...orderUpdate,
                      status: item.idStatus + 1,
                    });
                    if (data?.data) {
                      Swal.fire(
                        "Good job!",
                        "Cập nhập trạng thái đơn hàng thành công",
                        "success"
                      );
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: data?.message,
                      });
                    }
                  }
                }}
                className="text-white text-lg w-[70px] h-[50px] rounded-full bg-red-400 flex items-center justify-center hover:bg-gray-800 transition ml-2"
              >
                Cập nhập
              </button>
            )}
            <button
              onClick={() => {
                setIsModal(true);
                setOrderDetailId(item.key);
              }}
              className="text-white text-lg w-9 h-8 rounded-full bg-red-400 flex items-center justify-center hover:bg-gray-800 transition"
            >
              view
            </button>
            {item.status === "Đang giao hàng" ||
            item.status === "Đã giao xong" ||
            item.status === "Đã hủy" ||
            item.pay === "Đã thanh toán" ? (
              ""
            ) : (
              <button
                className="ml-2"
                onClick={async () => {
                  const { data: order } = await axios.get(
                    `http://localhost:8080/api/orders/${item.key}`
                  );
                  const orderUpdate = {
                    ...order.data,
                    pay: order.data.status === 2 ? true : order.data.pay,
                  };
                  const confirm = window.confirm(
                    `Bạn có chắc chắn hủy đơn hàng`
                  );
                  if (confirm) {
                    const data = await updateOrder({
                      ...orderUpdate,
                      status: -1,
                    });
                    if (data?.data) {
                      Swal.fire("Good job!", "Bạn đã hủy đơn hàng", "success");
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: data?.message,
                      });
                    }
                  }
                }}
              >
                Hủy đơn
              </button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <>
      {" "}
      {token ? (
        <div className="mx-10 my-10">
          <div className="flex justify-between">
            <h1 className="font-bold text-2xl">Quản lí đơn hàng của tôi</h1>
          </div>
          {myOrders?.data.length > 0 ? (
            <>
              {isLoading ? (
                <p>Loading....</p>
              ) : (
                <Table
                  className="mt-10"
                  dataSource={dataSource}
                  columns={columns}
                  pagination={{ pageSize: 4 }}
                />
              )}
              {isModal && (
                <Modal
                  hiddenModal={hiddenModal}
                  orderDetailId={orderDetailId}
                />
              )}
            </>
          ) : (
            <h1 className="text-3xl mt-5 flex justify-center items-center">
              Không có đơn hàng nào
            </h1>
          )}
        </div>
      ) : (
        <h1>Bạn chưa đăng nhập</h1>
      )}
    </>
  );
};

export default OrderPageAdmin;
