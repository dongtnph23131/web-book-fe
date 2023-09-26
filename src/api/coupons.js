import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { config } from "../config"
const url=config()
const couponsApi = createApi({
    reducerPath: 'coupons',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
    endpoints: (builder) => ({
        addCouponsToUser: builder.mutation({
            query: ({ token, userId, code }) => ({
                url: '/coupons/add/user',
                body: { userId, code },
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
    })
})

export const { useAddCouponsToUserMutation} = couponsApi
export default couponsApi