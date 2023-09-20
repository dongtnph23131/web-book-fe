import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const token = JSON.parse(localStorage.getItem('token'))
const cartApi = createApi({
    tagTypes: ['Cart'],
    reducerPath: 'cart',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: (builder) => ({
        getCartOfUser: builder.query({
            query: () => ({
                url: '/cart',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['Cart']
        }),
        addItemCart: builder.mutation({
            query: (item) => ({
                url: '/cart',
                method: 'POST',
                body: item,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Cart']
        }),
        removeItemProductCart: builder.mutation({
            query: (item) => ({
                url: '/cart/removeProductItem',
                method: 'POST',
                body: item,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Cart']
        }),
        removeItem: builder.mutation({
            query: (item) => ({
                url: '/cart/removeItem',
                method: 'POST',
                body: item,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Cart']
        }),
    })
})

export const { useGetCartOfUserQuery, useAddItemCartMutation,useRemoveItemProductCartMutation,useRemoveItemMutation } = cartApi
export default cartApi