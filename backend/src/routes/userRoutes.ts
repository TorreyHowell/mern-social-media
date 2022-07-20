import express from 'express'
import { getMe } from '../controller/userController'

const router = express.Router()

router.get('/', getMe)

export default router
