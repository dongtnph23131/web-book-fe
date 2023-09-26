import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const couponsApi = createApi({
    reducerPath: 'coupons',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: (builder) => ({
        addCouponsTouser: builder.mutation({
            query: ({ token, userId, code }) => ({
                url: () => '/coupons/add/user',
                body: { userId, code },
                method: 'POST',
                headers: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            })
        }),
        searchCoupons:builder.query({
            query:(searchCoupons)=>{
                console.log(searchCoupons);
                return `/coupons/search`
            }
        })
    })
})

export const { useAddCouponsTouserMutation,useSearchCouponsQuery} = couponsApi
export default couponsApi