import express from 'express'
import { createProduct, deleteProducts, getProducts, getSingleProduct, updateProduct } from '../controllers/product.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/', verifyToken,createProduct)
router.get('/', getProducts)
router.get('/single/:id', getSingleProduct)
router.post('/:id', verifyToken,updateProduct)
router.delete('/:id', verifyToken,deleteProducts)

export default router