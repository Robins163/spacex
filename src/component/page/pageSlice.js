import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {useGetAllDataQuery} from "./pageAPI";
import axios from "axios";

const initialState = {
    data: [],
    rocketName: '',
    launchStatus: '',
    upcoming: '',
    start:'',
    end:'',
    status: 'idle'
};

export const fetchRockets = createAsyncThunk(
    'page/rockets',
    async (params, { getState, requestId }) => {
        const state = getState()
        const {
            page
        } = state
        const instance = axios.create({
            baseURL: "https://api.spacexdata.com/v3/",
        });
        const {
            rocketName,
            start,
            end,
            launchStatus,
            upcoming
        } = page

        let url = 'launches'

        if (upcoming === 'true') {
            url += '/upcoming'
        }

        const { data } = await instance.get(`${url}?rocket_name=${rocketName}&launch_success=${launchStatus}&start=${start}&end=${end}&upcoming=${upcoming}`);
        return data;
    }
);

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setRocketName: (state, action) => {
            state.rocketName = action.payload
        },
        setLaunchStatus: (state, action) => {
            state.launchStatus = action.payload
        },
        setUpcoming: (state,action) => {
            state.upcoming = action.payload
        },
        setStart:(state,action)=> {
            console.log(action.payload)
            state.start = action.payload
        },
        setEnd:(state,action)=> {
            state.end = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRockets.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRockets.rejected, (state, config) => {
                state.status = 'idle';
            })
            .addCase(fetchRockets.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log(action)
                state.data = action.payload;
            });
    },
});

export const { setRocketName, setLaunchStatus, setUpcoming, setStart, setEnd } = pageSlice.actions;

export const selectRocketName = (state) => state.page.rocketName;
export const selectLaunchStatus = (state) => state.page.launchStatus;
export const selectUpcoming = (state) => state.page.upcoming;
export const isFetching = (state) => state.page.status !== 'idle';
export const getRockets = (state) => state.page.data;

export default pageSlice.reducer;


