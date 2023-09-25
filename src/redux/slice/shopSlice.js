import { createSlice } from "@reduxjs/toolkit";
import { Categories } from "../../data/Categories";
import { Products } from "../../data/Products";

const shopSlice = createSlice({

    name: "shop",

    initialState: {

        allCategories: Categories,
        allProducts: Products,
        categorySelected: "",
        productsFilterByCategory: [],
        productsSelected: {},
    },

    reducers: {

        setCategory: (state, action) => {

            state.categorySelected = action.payload;

        },

        setProductSelected: (state, action) => {

            state.productsSelected = action.payload;

        }

    },

})

export const { setCategory, setProductSelected } = shopSlice.actions;

export default shopSlice.reducer;