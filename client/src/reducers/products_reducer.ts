import { createSlice } from "@reduxjs/toolkit";

interface ProductsState {
    data: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    data: [],
    error: null,
    loading: false,
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        requestProducts: (state) => {
            state.loading = true;
        },
        requestProductsSuccess: (state, payload) => {
            state.data = payload.payload.allProducts;
            state.error = null;
            state.loading = false;
        },
        requestProductsFailure: (state, payload) => {
            state.data = [];
            state.error = payload.payload.message;
            state.loading = false;
        },
    },
});

export const {
    requestProducts,
    requestProductsSuccess,
    requestProductsFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
