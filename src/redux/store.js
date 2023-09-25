import { configureStore } from "@reduxjs/toolkit";
import shopSlice from "./slice/shopSlice";

export const store = configureStore({
    reducer: { shopSlice },
});