import express from 'express'

import {  login, logout, register, verifyEmail } from '../controllers/auth.controllers.js'
import multer from 'multer'
import { verifyToken } from '../middleware/verifyToken.js'

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

// router.post('/', verifyToken, upload.single('image'), imageUpload)
// router.post('/', verifyToken, upload.array('image',10), imageUpload)

router.post('/signup', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/verifyEmail', verifyEmail)
router.get('/sample', verifyToken, (req, res)=> {
    
    res.send('it is working')

})

export default router