import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({

    name: "shop",

    initialState: {
        
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