import express from 'express'
import {
  signUp,
  signIn,
  warnUser,
  blockUser,
  getUsers,
  validateRole,
} from '../controllers/userController'
import { auth, authModerator, authAdmin } from '../middleware/auth'

const router = express.Router()

router.get('/', auth, getUsers)
router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.post('/validateRole', auth, validateRole)
router.put('/warn/:userId', auth, authModerator, warnUser)
router.put('/block/:userId', auth, authAdmin, blockUser)

export default router
