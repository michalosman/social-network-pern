import express from 'express'
import {
  createFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} from '../controllers/friendsController'
import { auth } from '../middleware/auth'

const router = express.Router()

router.use(auth)

router.post('/request/:receiverId', createFriendRequest)
router.put('/accept/:senderId', acceptFriendRequest)
router.delete('/reject/:senderId', rejectFriendRequest)
router.delete('/remove/:friendId', removeFriend)

export default router
