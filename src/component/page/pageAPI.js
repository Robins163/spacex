import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rocketApi = createApi({
  name: "rocketApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.spacexdata.com/v3/" }),
  endpoints: (builder) => ({
    getAllData: builder.query({
      query: ({
        rocket_name = "",
        launch_date_utc = "",
        launch_success = "",
        start = "",
        end = "",
        upcoming = "",
      }) =>
        `launches?rocket_name=${rocket_name}&launch_date_utc=${launch_date_utc}&launch_success=${launch_success}&start=${start}&end=${end}&upcoming=${upcoming}`,
    }),
  }),
});

export const { useGetAllDataQuery } = rocketApi;
