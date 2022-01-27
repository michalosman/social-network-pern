import { Request, Response } from 'express'
import ApiError from '../error/ApiError'
import { Post } from '../models/Post'
import { Comment } from '../models/Comment'
import 'express-async-errors'
import { getRepository } from 'typeorm'
import { removeSensitiveDataPost } from '../utils/functions'
import { Friend } from '../models/Friend'

export const createPost = async (req: Request, res: Response) => {
  const { text } = req.body
  const user = req.user

  if (!text) throw ApiError.badRequest('Request data incomplete')

  const newPost = new Post()
  newPost.author = user
  newPost.text = text
  await newPost.save()

  const newPostData = removeSensitiveDataPost(newPost)

  return res.status(200).json(newPostData)
}

export const getPosts = async (req: Request, res: Response) => {
  const posts = await getRepository(Post)
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.author', 'author')
    .getMany()

  const postsData = posts.map((post) => removeSensitiveDataPost(post))

  return res.status(200).json(postsData)
}

export const getFriendsPosts = async (req: Request, res: Response) => {
  const user = req.user

  const friendships = await getRepository(Friend)
    .createQueryBuilder('f')
    .innerJoinAndSelect('f.sender', 'sender')
    .innerJoinAndSelect('f.receiver', 'receiver')
    .where(':userId IN (f.senderId, f.receiverId)', { userId: user.id })
    .andWhere('f.isApproved = true')
    .getMany()

  const friendsIds = friendships.map((friendship) =>
    friendship.senderId === user.id
      ? friendship.receiverId
      : friendship.senderId
  )

  const friendsPosts = await getRepository(Post)
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.author', 'author')
    .where('author.id IN (:...friendsIds)', {
      friendsIds: [...friendsIds, user.id],
    })
    .getMany()

  const friendsPostsData = friendsPosts.map((post) =>
    removeSensitiveDataPost(post)
  )

  return res.status(200).json(friendsPostsData)
}

export const addComment = async (req: Request, res: Response) => {
  const { text } = req.body
  const { postId } = req.params
  const user = req.user

  if (!text) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(postId)) throw ApiError.badRequest('Invalid post id')

  const post = await Post.findOne(postId)
  if (!post) throw ApiError.notFound('Post not found')

  const newComment = new Comment()
  newComment.author = user
  newComment.text = text
  newComment.post = post
  await newComment.save()

  const newCommentData = removeSensitiveDataPost(newComment)

  return res.status(200).json(newCommentData)
}

export const likePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  const user = req.user

  if (!parseInt(postId)) throw ApiError.badRequest('Invalid post id')

  const post = await getRepository(Post)
    .createQueryBuilder('posts')
    .leftJoinAndSelect('posts.likes', 'likes')
    .where('posts.id = :postId', { postId })
    .getOne()

  if (!post) throw ApiError.notFound('Post not found')

  const alreadyLiked = post.likes.find((likeUser) => likeUser.id === user.id)
  if (alreadyLiked) throw ApiError.methodNotAllowed('Post already liked')

  post.likes = [...post.likes, user]
  await post.save()

  return res.status(200).json({ likes: post.likes.length })
}

export const unlikePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  const user = req.user

  if (!parseInt(postId)) throw ApiError.badRequest('Invalid post id')

  const post = await getRepository(Post)
    .createQueryBuilder('posts')
    .leftJoinAndSelect('posts.likes', 'likes')
    .where('posts.id = :postId', { postId })
    .getOne()

  if (!post) throw ApiError.notFound('Post not found')

  const alreadyLiked = post.likes.find((likeUser) => likeUser.id === user.id)
  if (!alreadyLiked) throw ApiError.methodNotAllowed('Post not liked')

  post.likes = post.likes.filter((likeUser) => likeUser.id !== user.id)
  await post.save()

  return res.status(200).json({ likes: post.likes.length })
}
