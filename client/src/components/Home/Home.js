import FriendsSearch from '../FriendsSearch/FriendsSearch'
import Posts from '../Posts/Posts'
import FriendsList from '../FriendsList/FriendsList'
import FriendsRequests from '../FriendsRequests/FriendsRequests'
import './Home.css'

const Home = () => {
  return (
    <main className="container">
      <FriendsSearch />
      <Posts />
      <div>
        <FriendsList />
        <FriendsRequests />
      </div>
    </main>
  )
}

export default Home
