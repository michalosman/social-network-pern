import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import ApiError from '../error/ApiError'
import Post from '../models/Post'
import Comment from '../models/Comment'
import 'express-async-errors'
import { removeSensitiveDataPost } from '../utils/functions'
import Friend from '../models/Friend'

export const createPost = async (req: Request, res: Response) => {
  const { text } = req.body
  const { user } = req

  if (!text) throw ApiError.badRequest('Request data incomplete')

  const newPost = new Post()
  newPost.author = user
  newPost.text = text
  await newPost.save()

  const newPostData = removeSensitiveDataPost(newPost)

  res.status(200).json(newPostData)
}

export const getPosts = async (req: Request, res: Response) => {
  const posts = await getRepository(Post)
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.author', 'author')
    .leftJoinAndSelect('posts.likes', 'likes')
    .leftJoinAndSelect('posts.comments', 'comments')
    .leftJoinAndSelect('comments.author', 'commentAuthors')
    .getMany()

  const postsData = posts.map((post) => removeSensitiveDataPost(post))

  res.status(200).json(postsData)
}

export const getFriendsPosts = async (req: Request, res: Response) => {
  const { user } = req

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
    .leftJoinAndSelect('posts.likes', 'likes')
    .leftJoinAndSelect('posts.comments', 'comments')
    .leftJoinAndSelect('comments.author', 'commentAuthors')
    .where('author.id IN (:...friendsIds)', {
      friendsIds: [...friendsIds, user.id],
    })
    .getMany()

  const friendsPostsData = friendsPosts.map((post) =>
    removeSensitiveDataPost(post)
  )

  res.status(200).json(friendsPostsData)
}

export const addComment = async (req: Request, res: Response) => {
  const { text } = req.body
  const { postId } = req.params
  const { user } = req

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

  res.status(200).json({
    id: newCommentData.id,
    text: newCommentData.text,
    createdAt: newCommentData.createdAt,
    author: newCommentData.author,
  })
}

export const likePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  const { user } = req

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

  res.status(200).json({ likes: post.likes.length })
}

export const unlikePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  const { user } = req

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

  res.status(200).json({ likes: post.likes.length })
}

export const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params

  if (!parseInt(postId)) throw ApiError.badRequest('Invalid post id')

  const post = await Post.findOne(postId)

  if (!post) throw ApiError.notFound('Post not found')

  await post.remove()

  res.status(200).json({ message: 'Post removed succesfully' })
}
