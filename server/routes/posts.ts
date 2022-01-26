import express from 'express'
import { auth } from '../middleware/auth'
import {
  createPost,
  getPosts,
  addComment,
  likePost,
  unlikePost,
} from '../controllers/postsController'

const router = express.Router()

router.use(auth)

router.get('/', getPosts)
router.post('/', createPost)
router.post('/add-comment/:postId', addComment)
router.put('/like/:postId', likePost)
router.put('/unlike/:postId', unlikePost)

export default router
