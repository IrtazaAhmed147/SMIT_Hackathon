import axios from "axios"
import { loginFailure, loginStart, loginSuccess } from "../slices/authSlice"

export const loginUser = (credentials) => async(dispatch)=> {
    console.log(credentials);
    
    try {
        dispatch(loginStart())

        const user = await axios.post('http://localhost:8800/api/auth/login', credentials)
        console.log(user);
        
        dispatch(loginSuccess(user))
    } catch (error) {
        
        dispatch(loginFailure(error.response.data.message))
    }
}