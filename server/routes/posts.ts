import express from 'express'
import { auth, authAdminModerator } from '../middleware/auth'
import {
  createPost,
  getPosts,
  addComment,
  likePost,
  unlikePost,
  getFriendsPosts,
  deletePost,
} from '../controllers/postsController'

const router = express.Router()

router.use(auth)

router.get('/', getPosts)
router.get('/friends', getFriendsPosts)
router.post('/', createPost)
router.post('/add-comment/:postId', addComment)
router.put('/like/:postId', likePost)
router.put('/unlike/:postId', unlikePost)
router.delete('/:postId', authAdminModerator, deletePost)

export default router
