import express from 'express'
import {
  createFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  getFriends,
  getRequests,
  getNotFriends,
} from '../controllers/friendsController'
import { auth } from '../middleware/auth'

const router = express.Router()

router.use(auth)

router.get('/', getFriends)
router.get('/requests', getRequests)
router.get('/not-friends', getNotFriends)
router.post('/request/:receiverId', createFriendRequest)
router.put('/accept/:senderId', acceptFriendRequest)
router.delete('/reject/:senderId', rejectFriendRequest)
router.delete('/remove/:friendId', removeFriend)

export default router
