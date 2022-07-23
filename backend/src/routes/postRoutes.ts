import express from 'express'
import { createPost } from '../controller/postController'
import requireUser from '../middleware/requireUser'
import validate from '../middleware/validateResource'
import upload from '../config/multer'

const router = express.Router()

router.post('/', [requireUser, upload.single('image')], createPost)

export default router
