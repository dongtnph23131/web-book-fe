import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const token=JSON.parse(localStorage.getItem('token'))
const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (user) => ({
                url: '/signin',
                body: user,
                method: 'POST'
            })
        }),
        signup: builder.mutation({
            query: (user) => ({
                url: '/signup',
                body: user,
                method: 'POST'
            })
        }),
        getProfile: builder.query({
            query: (token) => {
                return {
                    url: '/getProfile',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            }
        }),
        updateProfile: builder.mutation({
            query: (user) => {
                return {
                    url: '/updateProfile',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'PATCH',
                    body: user
                }
            }
        }),
    })
})

export const { useSigninMutation, useSignupMutation, useGetProfileQuery ,useUpdateProfileMutation} = authApi
export default authApi