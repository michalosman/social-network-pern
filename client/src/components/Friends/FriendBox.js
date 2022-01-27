import * as api from '../../api'

const FriendBox = ({
  user,
  friends,
  setFriends,
  notFriends,
  setNotFriends,
}) => {
  const handleRemoveFriend = () => {
    api.removeFriend(user.id)
    setFriends(friends.filter((friend) => friend.id !== user.id))
    setNotFriends([...notFriends, user])
  }

  return (
    <div className="user-box">
      {`${user.firstName} ${user.lastName}`}
      <button className="user-button" onClick={handleRemoveFriend}>
        -
      </button>
    </div>
  )
}

export default FriendBox
