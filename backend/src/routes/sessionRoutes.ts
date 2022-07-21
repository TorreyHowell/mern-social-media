import express from 'express'
import validate from '../middleware/validateResource'
import requireUser from '../middleware/requireUser'
import { createSessionSchema } from '../validation/sessionSchema'
import { createSession, getSessions } from '../controller/sessionController'
import deserializeUser from '../middleware/deserializeUser'

const router = express.Router()

router.post('/', validate(createSessionSchema), createSession)
router.get('/', requireUser, getSessions)

export default router
