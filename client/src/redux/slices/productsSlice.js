import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: null,
    isLoading: false,
    error: false,
}
const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productFetchStart: (state) => {
            state.isLoading = true
            state.error = null

        },
        productFetchSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.products = payload
        },
        productFetchFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        productReset: (state) => {
            state.user = null
        }
    }
})

export const { productFetchStart,
    productFetchSuccess,
    productFetchFailure,
    productReset } = productsSlice.actions
export default productsSlice.reducer