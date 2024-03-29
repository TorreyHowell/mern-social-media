import express from 'express'
import validate from '../middleware/validateResource'
import requireUser from '../middleware/requireUser'
import { createSessionSchema } from '../validation/sessionSchema'
import {
  createSession,
  getSessions,
  getUserData,
  deleteSession,
} from '../controller/sessionController'

const router = express.Router()

router.post('/', validate(createSessionSchema), createSession)
router.get('/', requireUser, getSessions)
router.get('/refresh', getUserData)
router.delete('/', deleteSession)

export default router
