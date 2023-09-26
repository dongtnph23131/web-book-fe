import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { config } from "../config"
const url=config()
const publishingCompanyApi = createApi({
    tagTypes: ['publishingCompany'],
    reducerPath: 'publishingCompany',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
    endpoints: (builder) => ({
        getAllPublishingCompany: builder.query({
            query: () => '/publishingCompany',
            providesTags: ['publishingCompany']
        })
    })
})

export const {useGetAllPublishingCompanyQuery}=publishingCompanyApi
export default publishingCompanyApi