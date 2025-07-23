import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import productsSlice from './slices/productsSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productsSlice
    }
})

export default store