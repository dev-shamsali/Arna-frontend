import { configureStore } from "@reduxjs/toolkit";
import { cmsApi } from "../slices/cmsSlice";

export const store = configureStore({
  reducer: {
    [cmsApi.reducerPath]: cmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cmsApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
