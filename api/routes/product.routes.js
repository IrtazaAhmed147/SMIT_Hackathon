import express from 'express'
import { createProduct, deleteProducts, getProducts, getSingleProduct, updateProduct } from '../controllers/product.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'
import multer from 'multer'


const router = express.Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.mimetype.split('/')[1]}`)
    }
})

const upload = multer({ storage: storage })

router.post('/', verifyToken, upload.single('image'), createProduct)
router.get('/', getProducts)
router.get('/single/:id', getSingleProduct)
router.post('/:id', verifyToken, updateProduct)
router.delete('/:id', verifyToken, deleteProducts)

export default router