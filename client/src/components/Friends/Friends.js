import './Friends.css'
import SearchBox from './SearchBox'
import RequestBox from './RequestBox'
import FriendBox from './FriendBox'
import { users } from '../../assets/dummy_data'
import { requests } from '../../assets/dummy_data'
import { friends } from '../../assets/dummy_data'

const Friends = () => {
  const searchBoxes = users.map((user) => (
    <SearchBox key={user.id} user={user} />
  ))

  const requestBoxes = requests.map((user) => (
    <RequestBox key={user.id} user={user} />
  ))

  const friendBoxes = friends.map((user) => (
    <FriendBox key={user.id} user={user} />
  ))

  return (
    <aside className="aside">
      <div className="box">
        <p className="box-title">Users</p>
        <input className="input" placeholder="Search" />
        <div className="scroll">{searchBoxes}</div>
      </div>
      <div className="box">
        <p className="box-title">Requests</p>
        <div className="scroll">{requestBoxes}</div>
      </div>
      <div className="box">
        <p className="box-title">Friends</p>
        <div className="scroll"> {friendBoxes}</div>
      </div>
    </aside>
  )
}

export default Friends
