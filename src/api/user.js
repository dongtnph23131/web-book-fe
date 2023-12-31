import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { config } from "../config"
const url=config()
const userApi = createApi({
    tagTypes: ['User'],
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
    endpoints: (builder) => ({
        updatePassword: builder.mutation({
            query: ({ value, token }) => {
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
            query: ({ token, password }) => {
                return {
                    url: `/resetPassword/${token}`,
                    method: 'PATCH',
                    body: { password },
                }
            }
        }),
        getAllUser: builder.query({
            query: ({ role ,search}) => `/users?${role ? `role=${role}` : ``}${search?`&search=${search}`:``}`,
            providesTags: ['User']
        })
    })
})

export const { useUpdatePasswordMutation, useForgotPasswordMutation, useResettPasswordMutation, useGetAllUserQuery } = userApi
export default userApi