import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const categoryApi = createApi({
    tagTypes: ['Categpry'],
    reducerPath: 'category',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: (bulder) => {
        return {
            getAllCategory: bulder.query({
                query: () => `/categories`,
                providesTags: ['Categpry']
            }),
            getOneCategory: bulder.query({
                query: ({ id, sort, order, page }) => {
                    return `/categories/${id}?_limit=4&_page=${page}${sort ? `&_sort=${sort}` : ``}${order ? `&_order=${order}` : ``}`
                },
                providesTags: ['Categpry']
            }),
            getOneCategoryNoPage: bulder.query({
                query: ({ id, sort, order}) => {
                    return `/categories/${id}?${sort ? `&_sort=${sort}` : ``}${order ? `&_order=${order}` : ``}`
                },
                providesTags: ['Categpry']
            })
        }
    }
})
export const { useGetAllCategoryQuery, useGetOneCategoryQuery,useGetOneCategoryNoPageQuery } = categoryApi
export default categoryApi