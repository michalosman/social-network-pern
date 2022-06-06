import express from 'express'
import {
  signUp,
  signIn,
  warnUser,
  blockUser,
  getUsers,
  verifyUser,
} from '../controllers/userController'
import { auth, authModerator, authAdmin } from '../middleware/auth'

const router = express.Router()

router.get('/', auth, getUsers)
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.post('/verify-user', auth, verifyUser)
router.put('/warn/:userId', auth, authModerator, warnUser)
router.put('/block/:userId', auth, authAdmin, blockUser)

export default router
