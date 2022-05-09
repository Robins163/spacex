import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  rocketName: "",
  launchStatus: "",
  upcoming: "",
  start: "",
  end: "",
  status: "idle",
};

export const fetchRockets = createAsyncThunk(
  "page/rockets",
  async (params, { getState }) => {
    const state = getState();
    const { page } = state;
    const instance = axios.create({
      baseURL: "https://api.spacexdata.com/v3/",
    });
    const { rocketName, start, end, launchStatus, upcoming } = page;

    let url = "launches";

    if (upcoming === "true") {
      url += "/upcoming";
    }

    const searchParams = {};

    if (rocketName) {
      searchParams.rocket_name = rocketName;
    }

    if (launchStatus) {
      searchParams.launch_success = launchStatus;
    }

    if (start) {
      searchParams.start = start;
    }

    if (end) {
      searchParams.end = end;
    }

    if (upcoming) {
      searchParams.upcoming = upcoming;
    }

    const transformedToString = new URLSearchParams(searchParams);
    const { data } = await instance.get(
      `${url}?${transformedToString.toString()}`
    );
    return data;
  }
);

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setRocketName: (state, action) => {
      state.rocketName = action.payload;
    },
    setLaunchStatus: (state, action) => {
      state.launchStatus = action.payload;
    },
    setUpcoming: (state, action) => {
      state.upcoming = action.payload;
    },
    setStart: (state, action) => {
      console.trace();
      state.start = action.payload;
    },
    setEnd: (state, action) => {
      state.end = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRockets.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export const { setRocketName, setLaunchStatus, setUpcoming, setStart, setEnd } =
  pageSlice.actions;

export const selectRocketName = (state) => state.page.rocketName;
export const selectLaunchStatus = (state) => state.page.launchStatus;
export const selectUpcoming = (state) => state.page.upcoming;
export const isFetching = (state) => state.page.status !== "idle";
export const getRockets = (state) => state.page.data;

export default pageSlice.reducer;
