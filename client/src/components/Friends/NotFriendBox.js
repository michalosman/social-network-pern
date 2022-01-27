import * as api from '../../api'

const NotFriendBox = ({ user, notFriends, setNotFriends }) => {
  const handleCreateFriendRequest = () => {
    api.createFriendRequest(user.id)
    setNotFriends(notFriends.filter((notFriend) => notFriend.id !== user.id))
  }

  return (
    <div className="user-box">
      {`${user.firstName} ${user.lastName}`}
      <button className="user-button" onClick={handleCreateFriendRequest}>
        +
      </button>
    </div>
  )
}

export default NotFriendBox
