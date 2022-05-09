import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rocketApi = createApi({
  name: "rocketApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.spacexdata.com/v3/" }),
  endpoints: (builder) => ({
    getAllData: builder.query({
      query: ({
        rocketName = "",
        launchDateUtc = "",
        launchSuccess = "",
        start = "",
        end = "",
        upcoming = "",
      }) =>
        `launches?rocket_name=${rocketName}&launch_date_utc=${launchDateUtc}&launch_success=${launchSuccess}&start=${start}&end=${end}&upcoming=${upcoming}`,
    }),
  }),
});

export const { useGetAllDataQuery } = rocketApi;
