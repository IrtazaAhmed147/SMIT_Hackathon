import React, { useEffect } from 'react'
import ProductCard from '../../components/cards/productCard'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/actions/productsActions'

function ProductsPage() {

  const {products, isLoading, error} = useSelector((state)=> state.product) 
  console.log(products);
  console.log(isLoading);
  console.log(error);
  
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getAllProducts())
  },[])

  return (
    <Box display={'flex'}>


    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />

    </Box>
  )
}

export default ProductsPage