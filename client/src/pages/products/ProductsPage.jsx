import React from 'react'
import ProductCard from '../../components/cards/productCard'
import { Box } from '@mui/material'

function ProductsPage() {
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