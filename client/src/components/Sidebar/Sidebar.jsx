import './Sidebar.css'
import { useEffect, useState } from 'react'
import UserBox from '../UserBox'
import * as api from '../../api'

const Sidebar = () => {
  const [users, setUsers] = useState([])
  const [friends, setFriends] = useState([])
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetchUsers()
    fetchFriends()
    fetchRequests()
  }, [])

  const fetchUsers = async () => {
    const { data: notFriends } = await api.getNotFriends()
    setUsers(notFriends)
  }

  const fetchFriends = async () => {
    const { data: friends } = await api.getFriends()
    setFriends(friends)
  }

  const fetchRequests = async () => {
    const { data: friendRequests } = await api.getFriendRequests()
    setRequests(friendRequests)
  }

  const usersBoxes = users.map((user) => (
    <UserBox
      type="request"
      key={user.id}
      user={user}
      users={users}
      setUsers={setUsers}
      requests={requests}
      setRequests={setRequests}
    />
  ))

  const friendsBoxes = friends.map((user) => (
    <UserBox
      type="friend"
      key={user.id}
      user={user}
      users={users}
      setUsers={setUsers}
      friends={friends}
      setFriends={setFriends}
    />
  ))
  const requestsBoxes = requests.map((user) => (
    <UserBox
      type="user"
      key={user.id}
      user={user}
      users={users}
      setUsers={setUsers}
      friends={friends}
      setFriends={setFriends}
      requests={requests}
      setRequests={setRequests}
    />
  ))

  return (
    <aside className="aside ">
      <div className="box scroll-container">
        <p className="box-title">Users</p>
        {users.length === 0 && <p className="info">No users found</p>}
        <div className="scroll">{usersBoxes}</div>
      </div>
      <div className="box scroll-container">
        <p className="box-title">Friends</p>
        {friends.length === 0 && <p className="info">No friends added yet</p>}
        <div className="scroll"> {friendsBoxes}</div>
      </div>
      <div className="box scroll-container">
        <p className="box-title">Requests</p>
        {requests.length === 0 && (
          <p className="info">No friend requests received</p>
        )}
        <div className="scroll">{requestsBoxes}</div>
      </div>
    </aside>
  )
}

export default Sidebar
