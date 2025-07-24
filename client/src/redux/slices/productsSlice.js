import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: null,
    isLoading: false,
    error: false,
    message: '',
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


        productMessage: (state, { payload }) => {
            state.message = payload
            state.isLoading = false
            state.error = null
        }
    }
})

export const { productFetchStart,
    productFetchSuccess,
    productFetchFailure,
    productReset,
    productMessage } = productsSlice.actions
export default productsSlice.reducer