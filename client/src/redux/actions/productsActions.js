import axios from "axios"
import { productFetchFailure, productFetchStart, productFetchSuccess } from "../slices/productsSlice";

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