import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const categoryApi = createApi({
    tagTypes: ['Categpry'],
    reducerPath: 'category',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://bookstore-yfsw.onrender.com/api' }),
    endpoints: (bulder) => {
        return {
            getAllCategory: bulder.query({
                query: () => `/categories`,
                providesTags: ['Categpry']
            }),
            getOneCategory: bulder.query({
                query: ({ id, sort, order, page,limit }) => {
                    return `/categories/${id}?${limit ? `&_limit=${limit}`:'_limit=100'}&_page=${page}${sort ? `&_sort=${sort}` : ``}${order ? `&_order=${order}` : ``}`
                },
                providesTags: ['Categpry']
            }),
            getOneCategoryNoPage: bulder.query({
                query: ({ id, sort, order }) => {
                    return `/categories/${id}?${sort ? `&_sort=${sort}` : ``}${order ? `&_order=${order}` : ``}`
                },
                providesTags: ['Categpry']
            })
        }
    }
})
export const { useGetAllCategoryQuery, useGetOneCategoryQuery, useGetOneCategoryNoPageQuery } = categoryApi
export default categoryApi