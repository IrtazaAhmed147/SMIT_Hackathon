import axios from "axios"
import { productFetchFailure, productFetchStart, productFetchSuccess } from "../slices/productsSlice";

export const getAllProducts = ()=> async(dispatch)=> {
    try {
        dispatch(productFetchStart())
        const res = await axios.get('http://localhost:8800/api/product', {
            withCredentials: true
        })
        console.log(res.data.data);
        dispatch(productFetchSuccess(res.data.data))
    } catch (error) {
        console.log(error);
        dispatch(productFetchFailure(error))
        
    }
}