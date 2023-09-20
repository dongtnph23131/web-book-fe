import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const publishingCompanyApi = createApi({
    tagTypes: ['publishingCompany'],
    reducerPath: 'publishingCompany',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: (builder) => ({
        getAllPublishingCompany: builder.query({
            query: () => '/publishingCompany',
            providesTags: ['publishingCompany']
        })
    })
})

export const {useGetAllPublishingCompanyQuery}=publishingCompanyApi
export default publishingCompanyApi