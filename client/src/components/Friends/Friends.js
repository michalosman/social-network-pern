import './Friends.css'
import NotFriendBox from './NotFriendBox'
import RequestBox from './RequestBox'
import FriendBox from './FriendBox'
import { useEffect, useState } from 'react'
import * as api from '../../api'

const Friends = () => {
  const [friends, setFriends] = useState([])
  const [notFriends, setNotFriends] = useState([])
  const [friendRequests, setFriendRequests] = useState([])

  useEffect(() => {
    fetchFriends()
    fetchNotFriends()
    fetchFriendRequests()
  }, [])

  const fetchFriends = async () => {
    const { data: friends } = await api.getFriends()
    setFriends(friends)
  }

  const fetchNotFriends = async () => {
    const { data: notFriends } = await api.getNotFriends()
    setNotFriends(notFriends)
  }

  const fetchFriendRequests = async () => {
    const { data: friendRequests } = await api.getFriendRequests()
    setFriendRequests(friendRequests)
  }

  const friendBoxes = friends.map((user) => (
    <FriendBox
      key={user.id}
      user={user}
      friends={friends}
      setFriends={setFriends}
      notFriends={notFriends}
      setNotFriends={setNotFriends}
    />
  ))

  const notFriendsBoxes = notFriends.map((user) => (
    <NotFriendBox
      key={user.id}
      user={user}
      notFriends={notFriends}
      setNotFriends={setNotFriends}
      friendRequests={friendRequests}
      setFriendRequests={setFriendRequests}
    />
  ))

  const friendRequestBoxes = friendRequests.map((user) => (
    <RequestBox
      key={user.id}
      user={user}
      friendRequests={friendRequests}
      setFriendRequests={setFriendRequests}
      friends={friends}
      setFriends={setFriends}
      notFriends={notFriends}
      setNotFriends={setNotFriends}
    />
  ))

  return (
    <aside className="aside ">
      {friends.length > 0 ? (
        <div className="box scroll-container">
          <p className="box-title">Friends</p>
          <div className="scroll"> {friendBoxes}</div>
        </div>
      ) : (
        <></>
      )}
      {notFriends.length > 0 ? (
        <div className="box scroll-container">
          <p className="box-title">Add friend</p>
          {/* <input className="input" placeholder="Search" /> */}
          <div className="scroll">{notFriendsBoxes}</div>
        </div>
      ) : (
        <></>
      )}
      {friendRequests.length > 0 ? (
        <div className="box scroll-container">
          <p className="box-title">Friend requests</p>
          <div className="scroll">{friendRequestBoxes}</div>
        </div>
      ) : (
        <></>
      )}
    </aside>
  )
}

export default Friends
