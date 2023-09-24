import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: (builder) => ({
        updatePassword: builder.mutation({
            query: ({value,token}) => {
                return {
                    url: '/updatePassword',
                    method: 'PATCH',
                    body: value,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            }
        }),
        forgotPassword: builder.mutation({
            query: (email) => {
                return {
                    url: '/forgotPassword',
                    method: 'POST',
                    body: email,
                }
            }
        }),
        resettPassword: builder.mutation({
            query: ({token,password}) => {
                return {
                    url: `/resetPassword/${token}`,
                    method: 'PATCH',
                    body: {password},
                }
            }
        }),
    })
})

export const { useUpdatePasswordMutation,useForgotPasswordMutation ,useResettPasswordMutation} = userApi
export default userApi