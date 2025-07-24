import React, { useRef } from 'react'
import { createProductApi } from '../../redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../utils/HelperFunctions';
import { CircularProgress } from '@mui/material';

function CreateProduct() {

    const form = useRef({})
    const dispatch = useDispatch()
    const {message, isLoading, error} = useSelector((state)=> state.product)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        for (let key in form.current) {
            formData.append(key, form.current[key]);
        }

        dispatch(createProductApi(formData)).then((msg)=>  notify('success', msg)).catch((err)=>  notify('error', err))

    }

    return (
        <form onSubmit={handleSubmit}>
            <label >Name: </label>
            <input type="text" name='name' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} required />
            <label >Description </label>
            <input type="text" name='desc' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} required />
            <label >Category </label>
            <input type="text" name='category' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} required />
            <label >Price: </label>
            <input type="number" name='price' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} min={1} required />
            <label >Images</label>
            <input name='image' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.files[0] }} type="file" />
            <button style={{display: 'flex', alignItems: 'center', padding: '5px 10px', gap: '5px'}} disabled={isLoading}>{isLoading &&  <CircularProgress size={20}/>} Create product</button>
           
        </form>
    )
}

export default CreateProduct