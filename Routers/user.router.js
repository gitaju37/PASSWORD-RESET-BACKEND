import express from 'express'
import { changePassword, createUser, forgotPassword, userLogin } from '../Controllers/user.controller.js'

const router = express.Router()

router.post( '/login', userLogin )
router.post( '/register', createUser )
router.post( '/fgpassword', forgotPassword )
router.post('/changepassword',changePassword)


export default router