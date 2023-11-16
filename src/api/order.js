import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config";
const url = config();
const token = JSON.parse(localStorage.getItem("token"));
const orderApi = createApi({
  reducerPath: "order",
  tagTypes: ["Order"],
  baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "post",
        body: order,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Order"],
    }),
    // getAllOrder: builder.query({
    //     query: () => '/orders',
    //     providesTags: ['Order']
    // }),
    getDetailOrder: builder.query({
        query: (id) => `/orders/${id}`,
        providesTags: ['Order']
    }),
    updateOrder: builder.mutation({
        query: (order) => ({
            url: `/orders/${order._id}`,
            body: order,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
        invalidatesTags:['Order']
    }),
    getMyOrder: builder.query({
      query: (token) => {
        return {
          url: `/myOrder`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Order"],
    }),
  }),
});
export const { useCreateOrderMutation,useGetMyOrderQuery ,useGetDetailOrderQuery,useUpdateOrderMutation} = orderApi;

export default orderApi;
