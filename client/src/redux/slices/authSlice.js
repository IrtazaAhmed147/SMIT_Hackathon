import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    error: false,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true
            state.error = null

        },
        loginSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.user = payload
            localStorage.setItem("user", JSON.stringify(state.user))
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        signupStart: (state) => {
            state.isLoading = true
            state.error = null

        },
        signupSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.user = payload
        },
        signupFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions
export default authSlice.reducer