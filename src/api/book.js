import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const bookApi = createApi({
    tagTypes: ['Book'],
    reducerPath: 'book',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: ({sort, order,search}) => `/books?${sort ? `&_sort=${sort}` : ``}${order ? `&_order=${order}`:``}${search?`&q=${search}`:``}`,
            providesTags: ['Book']
        }),
        getAllBooksNoPage: builder.query({
            query: ({sort, order,search,page}) => `/books?_limit=4&_page=${page}${sort ? `&_sort=${sort}` : ``}${order ? `&_order=${order}`:``}${search?`&q=${search}`:``}`,
            providesTags: ['Book']
        }),
        getOneBook: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: ['Book']
        }),
        addViewBook: builder.mutation({
            query: (id) => {
                return {
                    url:`/books/addView/${id}`,
                    method:'PATCH',
                }
            },
            invalidatesTags: ['Book']
        }),
    })
})

export const {useGetAllBooksQuery,useGetAllBooksNoPageQuery,useGetOneBookQuery,useAddViewBookMutation}=bookApi
export default bookApi