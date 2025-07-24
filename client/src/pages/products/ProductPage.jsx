import React, { useEffect, useRef, useState } from 'react'
import ProductCard from '../../components/cards/ProductCard/ProductCard.jsx'
import { Box, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/actions/productsActions'
import SearchIcon from '@mui/icons-material/Search';
import './ProductPage.css'

function ProductPage() {

  const { products, isLoading, error } = useSelector((state) => state.product)
  const searchInput = useRef('')
  const [min, setMin] = useState(false)
  const [max, setMax] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(getAllProducts({
        name: searchInput.current,
        min: min || 0,
        max: max || 999999999999,
      }))

    } catch (error) {
      searchInput
    }
  }
  return (
    <>
      <Box>

        <form className='products-form' >
          <label >Search</label>
          <input onChange={(e) => searchInput.current = e.target.value} className='searchInput' type="text" placeholder='search product' />

          <div>


            <h4 >Price</h4>
            <div className='minMaxBox'>

              <label >Min</label>
              <input type="number" style={{ padding: '5px', width: '60px' }} onChange={(e) => setMin(e.target.value)} min={1} />
              <label >Max</label>
              <input type="number" style={{ padding: '5px', width: '60px' }} onChange={(e) => setMax(e.target.value)} max={9999} />
            </div>
          </div>


          <button className='submitBtn' onClick={handleSubmit}><SearchIcon /> Submit</button>
          {/* <button className='submitBtn'><SearchIcon /></button> */}
        </form>

      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '80%', margin: 'auto', minHeight: '100vh', gap: '10px' }}>

        {isLoading ? <div style={{ margin: 'auto' }}><CircularProgress /></div> : (products?.map((product, i) => (
          <ProductCard key={product._id} {...product} />
        )))}
      </Box>
    </>
  )
}

export default ProductPage