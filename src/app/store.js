import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "../features/counter/counterSlice";
import pageReducer from "../component/page/pageSlice";
import { rocketApi } from "../component/page/pageAPI";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    page: pageReducer,
    [rocketApi.reducerPath]: rocketApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rocketApi.middleware),
});

setupListeners(store.dispatch);

export default store;
