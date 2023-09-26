import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const authorApi = createApi({
    tagTypes: ['Author'],
    reducerPath: 'author',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://bookstore-yfsw.onrender.com/api' }),
    endpoints: (builder) => ({
        getAllAuthor: builder.query({
            query: () => '/authors',
            providesTags: ['Author']
        })
    })
})

export const {useGetAllAuthorQuery}=authorApi
export default authorApi