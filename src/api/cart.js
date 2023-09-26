import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { config } from "../config"
const url=config()
const cartApi = createApi({
    tagTypes: ['Cart'],
    reducerPath: 'cart',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
    endpoints: (builder) => ({
        getCartOfUser: builder.query({
            query: (token) => {
                return {
                    url: '/cart',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            },
            providesTags: ['Cart']
        }),
        addItemCart: builder.mutation({
            query: ({itemNew,token}) => {
                return {
                    url: '/cart',
                    method: 'POST',
                    body: itemNew,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            },
            invalidatesTags: ['Cart']
        }),
        removeItemProductCart: builder.mutation({
            query: ({itemNew,token}) => {
                return {
                    url: '/cart/removeProductItem',
                    method: 'POST',
                    body: itemNew,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            },
            invalidatesTags: ['Cart']
        }),
        removeItem: builder.mutation({
            query: ({itemNew,token}) => {
                return {
                    url: '/cart/removeItem',
                    method: 'POST',
                    body: itemNew,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            },
            invalidatesTags: ['Cart']
        }),
    })
})

export const { useGetCartOfUserQuery, useAddItemCartMutation,useRemoveItemProductCartMutation,useRemoveItemMutation } = cartApi
export default cartApi