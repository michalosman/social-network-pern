import React from 'react'
import * as api from '../../api'
import './UserBox.css'

const UserBox = ({
  type,
  user,
  users,
  friends,
  requests,
  setUsers,
  setFriends,
  setRequests,
}) => {
  const handleRemoveFriend = () => {
    api.removeFriend(user.id)
    setFriends(friends.filter((friend) => friend.id !== user.id))
    setUsers([...users, user])
  }

  const handleCreateFriendRequest = () => {
    api.createFriendRequest(user.id)
    setUsers(users.filter((notFriend) => notFriend.id !== user.id))
  }

  const handleAcceptFriendRequest = () => {
    api.acceptFriendRequest(user.id)
    setRequests(
      requests.filter((requestSender) => requestSender.id !== user.id)
    )
    setFriends([...friends, user])
  }

  const handleRejectFriendRequest = () => {
    api.rejectFriendRequest(user.id)
    setRequests(
      requests.filter((requestSender) => requestSender.id !== user.id)
    )
    setUsers([...users, user])
  }

  if (type === 'friend')
    return (
      <div className="user-box">
        {`${user.firstName} ${user.lastName}`}
        <button className="user-button" onClick={handleRemoveFriend}>
          -
        </button>
      </div>
    )

  if (type === 'request')
    return (
      <div className="user-box">
        {`${user.firstName} ${user.lastName}`}
        <button className="user-button" onClick={handleCreateFriendRequest}>
          +
        </button>
      </div>
    )

  return (
    <div className="user-box">
      <div className="user-name">{`${user.firstName} ${user.lastName}`}</div>
      <div className="button-group">
        <button className="user-button" onClick={handleAcceptFriendRequest}>
          +
        </button>
        <button className="user-button" onClick={handleRejectFriendRequest}>
          -
        </button>
      </div>
    </div>
  )
}

export default UserBox
