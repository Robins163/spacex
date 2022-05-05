import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rocketApi = createApi({
    name: "rocketApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v3/' }),
    endpoints: (builder) => ({
        getAllData: builder.query({
            query: () => `launches`,
        }),
    }),
})

export const {useGetAllDataQuery} = rocketApi
