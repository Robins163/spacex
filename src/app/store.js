import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import pageReducer from '../component/page/pageSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
import {rocketApi} from '../component/page/pageAPI';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    page: pageReducer,
    [rocketApi.reducerPath]: rocketApi.reducer,
  },
  middleware : (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rocketApi.middleware),
});

setupListeners(store.dispatch)
