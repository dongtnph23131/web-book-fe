import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { config } from "../config"
const url=config()
const token=JSON.parse(localStorage.getItem('token'))
const bookApi = createApi({
    tagTypes: ['Book'],
    reducerPath: 'book',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: ({ sort, order, search, limit, dataCategories, page }) => {
                const categories = dataCategories ? dataCategories.map(item => {
                    return item._id
                }).join('.') : []
                return `/books?${limit ? `&_limit=${limit}` : `&_limit=100`}&_page=${page}${sort ? `&_sort=${sort}` : ``}${order ? `&_order=${order}` : ``}${search ? `&q=${search}` : ``}${categories ? `&categories=${categories}` : ``}`
            },
            providesTags: ['Book']
        }),
        getAllBooksNoPage: builder.query({
            query: ({ sort, order, search, dataCategories }) => {
                const categories =dataCategories? dataCategories.map(item => {
                    return item._id
                }).join('.'):[]
                return `/books?${sort ? `&_sort=${sort}` : ``}${order ? `&_order=${order}` : ``}${search ? `&q=${search}` : ``}${categories ? `&categories=${categories}` : ``}`
            },
            providesTags: ['Book']
        }),
        getOneBook: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: ['Book']
        }),
        addViewBook: builder.mutation({
            query: (id) => {
                return {
                    url: `/books/addView/${id}`,
                    method: 'PATCH',
                }
            },
            invalidatesTags: ['Book']
        }),
        addBook:builder.mutation({
            query:(book)=>({
                url:'/books',
                method:'POST',
                body:book,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags:['Book']
        })
    })
})

export const { useGetAllBooksQuery, useGetAllBooksNoPageQuery, useGetOneBookQuery, useAddViewBookMutation,useAddBookMutation } = bookApi
export default bookApi