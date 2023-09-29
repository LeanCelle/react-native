import { configureStore } from "@reduxjs/toolkit";
import shopSlice from "./slice/shopSlice";
import { RealAPI } from "../services/RealAPI";
import authSlice from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    shopSlice,
    [RealAPI.reducerPath]: RealAPI.reducer,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RealAPI.middleware),
});