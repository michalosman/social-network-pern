import { User } from '../models/User'
import ApiError from '../error/ApiError'
import 'express-async-errors'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Friend } from '../models/Friend'
import { removeSensitiveData } from '../utils/functions'

export const getFriends = async (req: Request, res: Response) => {
  const user = req.user

  const friendships = await getRepository(Friend)
    .createQueryBuilder('f')
    .innerJoinAndSelect('f.sender', 'sender')
    .innerJoinAndSelect('f.receiver', 'receiver')
    .where(':userId IN (f.senderId, f.receiverId)', { userId: user.id })
    .andWhere('f.isApproved = true')
    .getMany()

  const friends = friendships.map((friendship) =>
    friendship.senderId === user.id
      ? removeSensitiveData(friendship.receiver)
      : removeSensitiveData(friendship.sender)
  )

  res.status(200).json(friends)
}

export const getRequests = async (req: Request, res: Response) => {
  const user = req.user

  const friendRequests = await getRepository(Friend)
    .createQueryBuilder('f')
    .innerJoinAndSelect('f.sender', 'sender')
    .where(':userId = f.receiverId', { userId: user.id })
    .andWhere('f.isApproved = false')
    .getMany()

  const requestsUsers = friendRequests.map((request) =>
    removeSensitiveData(request.sender)
  )

  res.status(200).json(requestsUsers)
}

export const getNotFriends = async (req: Request, res: Response) => {
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

  const notFriends = await getRepository(User)
    .createQueryBuilder('users')
    .where('users.id NOT IN (:...friendsIds)', { friendsIds })
    .andWhere("users.role = 'user'")
    .getMany()

  const notFriendsData = notFriends.map((user) => removeSensitiveData(user))

  res.status(200).json(notFriendsData)
}

export const createFriendRequest = async (req: Request, res: Response) => {
  const { receiverId } = req.params
  const user = req.user

  if (!parseInt(receiverId)) throw ApiError.badRequest('Invalid user id')
  if (user.id === parseInt(receiverId))
    throw ApiError.methodNotAllowed("Can't create such friendship")

  const receiver = await User.findOne(receiverId)
  if (!receiver) throw ApiError.notFound('User not found')

  const alreadyCreated = await getRepository(Friend)
    .createQueryBuilder('f')
    .where(
      'f.senderId IN (:userId, :receiverId) AND f.receiverId IN (:userId, :receiverId)',
      { userId: user.id, receiverId }
    )
    .getOne()

  if (alreadyCreated && alreadyCreated.isApproved)
    throw ApiError.methodNotAllowed('Already friends')
  else if (alreadyCreated)
    throw ApiError.methodNotAllowed('Friend request already exists')

  const newFriendRequest = new Friend()

  newFriendRequest.senderId = user.id
  newFriendRequest.receiverId = receiver.id

  await newFriendRequest.save()

  res.status(200).json(newFriendRequest)
}

export const acceptFriendRequest = async (req: Request, res: Response) => {
  const { senderId } = req.params
  const user = req.user

  const friendRequest = await getRepository(Friend)
    .createQueryBuilder('f')
    .where('f.senderId = :senderId AND f.receiverId = :receiverId', {
      senderId,
      receiverId: user.id,
    })
    .getOne()

  if (!friendRequest) throw ApiError.notFound('Friend request not found')
  if (friendRequest.isApproved)
    throw ApiError.methodNotAllowed('Request already approved')

  friendRequest.isApproved = true
  await friendRequest.save()

  res.status(200).json(friendRequest)
}

export const rejectFriendRequest = async (req: Request, res: Response) => {
  const { senderId } = req.params
  const user = req.user

  const friendRequest = await getRepository(Friend)
    .createQueryBuilder('f')
    .where('f.senderId = :senderId AND f.receiverId = :receiverId', {
      senderId,
      receiverId: user.id,
    })
    .getOne()

  if (!friendRequest) throw ApiError.notFound('Friend request not found')
  if (friendRequest.isApproved)
    throw ApiError.methodNotAllowed('Request already approved')

  await friendRequest.remove()

  res.status(200).json({ message: 'Friend request rejected succesfully' })
}

export const removeFriend = async (req: Request, res: Response) => {
  const { friendId } = req.params
  const user = req.user

  const friendship = await getRepository(Friend)
    .createQueryBuilder('f')
    .where(
      'f.senderId IN (:userId, :friendId) AND f.receiverId IN (:userId, :friendId)',
      { userId: user.id, friendId }
    )
    .getOne()

  if (!friendship) throw ApiError.notFound('Friend request not found')
  if (!friendship.isApproved)
    throw ApiError.methodNotAllowed('Friendship not approved')

  await friendship.remove()

  res.status(200).json({ message: 'Friend removed succesfully' })
}
