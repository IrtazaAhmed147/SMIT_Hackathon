import express from 'express'

import { checkAuth, login, logout, register, verifyEmail } from '../controllers/auth.controllers.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/signup', register)
router.post('/login', login)
router.get('/checkauth', verifyToken,checkAuth)
router.get('/logout', logout)
router.post('/verifyEmail', verifyEmail)

export default router