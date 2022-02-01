import './Home.css'
import { useContext, useState } from 'react'
import Posts from '../../components/Posts'
import Sidebar from '../../components/Sidebar'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { AuthContext } from '../../context/AuthContext'
import Navbar from '../../components/Navbar'

const Home = () => {
  const { width } = useWindowDimensions()
  const [isPostsOpen, setIsPostsOpen] = useState(true)
  const [isFriendsOpen, setIsFriendsOpen] = useState(true)
  const { user } = useContext(AuthContext)

  const displayPosts = () => {
    setIsPostsOpen(true)
    setIsFriendsOpen(false)
  }

  const displayFriends = () => {
    setIsFriendsOpen(true)
    setIsPostsOpen(false)
  }

  if (width < 680) {
    if (isPostsOpen) if (isFriendsOpen) setIsFriendsOpen(false)
  }

  if (width > 680) {
    if (!isPostsOpen) setIsPostsOpen(true)
    if (!isFriendsOpen) setIsFriendsOpen(true)
  }

  return (
    <>
      <Navbar onClickPosts={displayPosts} onClickFriends={displayFriends} />
      <div className="container">
        {isPostsOpen ? <Posts /> : <></>}
        {isFriendsOpen && user.role === 'user' ? <Sidebar /> : <></>}
      </div>
      <footer className="footer">Copyright © 2022 Michał Osman</footer>
    </>
  )
}

export default Home
