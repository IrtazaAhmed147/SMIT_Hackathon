import axios from "axios"
import { productFetchFailure, productFetchStart, productFetchSuccess, productMessage } from "../slices/productsSlice";

export const getAllProducts = (query) => async (dispatch) => {
    try {
        dispatch(productFetchStart())
        const res = await axios.get('http://localhost:8800/api/product', {
            params: {
                name: query?.name,
                min: query?.min,
                max: query?.max,
                // category: 'electronics',
                // page: 2,
                // limit: 3,
            },
            withCredentials: true
        },)
        console.log(res.data.data);
        dispatch(productFetchSuccess(res.data.data))
    } catch (error) {
        console.log(error);
        dispatch(productFetchFailure(error))

    }
}

export const createProductApi = (formData) => async (dispatch) => {

    try {
        dispatch(productFetchStart())
        const res = await axios.post('http://localhost:8800/api/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })

        console.log(res.data.message);
        dispatch(productMessage(res.data.message))
        return res.data.message
    } catch (error) {
        // console.log(error);
        dispatch(productFetchFailure(error))
        throw error.response.data.message
    }
}