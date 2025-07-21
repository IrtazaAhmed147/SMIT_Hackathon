import axios from "axios"
import { loginFailure, loginStart, loginSuccess, signupStart, signupSuccess, signupFailure } from "../slices/authSlice"


export const registerUser = (credentials) => async (dispatch) => {
 
    
    try {
        dispatch(signupStart())

        const res = await axios.post('http://localhost:8800/api/auth/signup', credentials, {
            withCredentials: true
        })
       
        
        localStorage.setItem('tempToken', res.data.token)
        if(res.data.success) {
            dispatch(signupSuccess())
        }
        return res.data.message
    } catch (error) {
        dispatch(signupFailure(error.response.data.message))
        throw error.response.data.message
    }
}

export const loginUser = (credentials) => async (dispatch) => {
  

    try {
        dispatch(loginStart())

        const res = await axios.post('http://localhost:8800/api/auth/login', credentials, {
            withCredentials: true
        })

        dispatch(loginSuccess(res?.data.data))
        return res.data.message
    } catch (error) {

        dispatch(loginFailure(error.response.data.message))
        throw error.response.data.message
    }
}