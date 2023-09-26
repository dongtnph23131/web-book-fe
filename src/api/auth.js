import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://bookstore-zjae.onrender.com/api' }),
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
            query: ({newUser,token}) => {
                return {
                    url: '/updateProfile',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'PATCH',
                    body: newUser
                }
            }
        }),
    })
})

export const { useSigninMutation, useSignupMutation, useGetProfileQuery ,useUpdateProfileMutation} = authApi
export default authApi