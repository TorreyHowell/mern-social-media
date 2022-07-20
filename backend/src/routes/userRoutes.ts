import express from 'express'
import { CreateUser, testThrow } from '../controller/userController'
import validate from '../middleware/validateResource'
import { createUserSchema } from '../validation/userSchema'

const router = express.Router()

router.post('/', validate(createUserSchema), CreateUser)
router.get('/', testThrow)

export default router
