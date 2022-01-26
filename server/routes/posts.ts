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
router.post('/:postId/add-comment', addComment)
router.put('/:postId/like', likePost)
router.put('/:postId/unlike', unlikePost)

export default router
