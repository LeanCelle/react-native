import { configureStore } from "@reduxjs/toolkit";
import shopSlice from "./slice/shopSlice";
import { RealAPI } from "../services/RealAPI";

export const store = configureStore({
  reducer: {
    shopSlice,
    [RealAPI.reducerPath]: RealAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RealAPI.middleware),
});