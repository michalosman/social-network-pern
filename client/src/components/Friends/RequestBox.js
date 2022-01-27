import * as api from '../../api'

const RequestBox = ({
  user,
  friendRequests,
  setFriendRequests,
  friends,
  setFriends,
  notFriends,
  setNotFriends,
}) => {
  const handleAcceptFriendRequest = () => {
    api.acceptFriendRequest(user.id)
    setFriendRequests(
      friendRequests.filter((requestSender) => requestSender.id !== user.id)
    )
    setFriends([...friends, user])
  }

  const handleRejectFriendRequest = () => {
    api.rejectFriendRequest(user.id)
    setFriendRequests(
      friendRequests.filter((requestSender) => requestSender.id !== user.id)
    )
    setNotFriends([...notFriends, user])
  }

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

export default RequestBox
