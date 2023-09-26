import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { config } from "../config"
const url=config()
const authorApi = createApi({
    tagTypes: ['Author'],
    reducerPath: 'author',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
    endpoints: (builder) => ({
        getAllAuthor: builder.query({
            query: () => '/authors',
            providesTags: ['Author']
        })
    })
})

export const {useGetAllAuthorQuery}=authorApi
export default authorApi