import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const couponsApi = createApi({
    reducerPath: 'coupons',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://bookstore-yfsw.onrender.com/api' }),
    endpoints: (builder) => ({
        addCouponsToUser: builder.mutation({
            query: ({ token, userId, code }) => ({
                url: '/coupons/add/user',
                body: { userId, code },
                method: 'POST',
                headers: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            })
        }),
    })
})

export const { useAddCouponsToUserMutation} = couponsApi
export default couponsApi