import axios from "axios"
import { loginFailure, loginStart, loginSuccess, signupStart, signupSuccess, signupFailure } from "../slices/authSlice"


export const registerUser = (credentials) => async (dispatch) => {
    console.log(credentials);
    
    try {
        dispatch(signupStart())

        const user = await axios.post('http://localhost:8800/api/auth/signup', credentials, {
            withCredentials: true
        })
        console.log(user);
        if(user.data.success) {

            dispatch(signupSuccess())
            
        }
    } catch (error) {
        dispatch(signupFailure(error.response.data.message))
    }
}

export const loginUser = (credentials) => async (dispatch) => {
    console.log(credentials);

    try {
        dispatch(loginStart())

        const user = await axios.post('http://localhost:8800/api/auth/login', credentials, {
            withCredentials: true
        })

        dispatch(loginSuccess(user?.data.data))
    } catch (error) {

        dispatch(loginFailure(error.response.data.message))
    }
}