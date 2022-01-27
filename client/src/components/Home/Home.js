import './Home.css'
import { useContext, useState } from 'react'
import Posts from '../Posts/Posts'
import logo from '../../assets/images/logo.png'
import Friends from '../Friends/Friends'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { AuthContext } from '../../context/AuthContext'

const Home = () => {
  const { width } = useWindowDimensions()
  const [isPostsOpen, setIsPostsOpen] = useState(true)
  const [isFriendsOpen, setIsFriendsOpen] = useState(true)
  const { user, signOut } = useContext(AuthContext)

  const displayPosts = () => {
    setIsPostsOpen(true)
    setIsFriendsOpen(false)
  }

  const displayFriends = () => {
    setIsFriendsOpen(true)
    setIsPostsOpen(false)
  }

  const handleSignOut = () => {
    signOut()
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
      <header className="header">
        <div className="container">
          <div className="left-panel">
            <img className="logo" src={logo} alt="logo" />
            <h1 className="page-name">Social Network</h1>
          </div>
          <div className="right-panel">
            <p>{`${user.firstName} ${user.lastName}`}</p>
            <button onClick={handleSignOut}>Sign out</button>
          </div>
          <div className="mobile-menu">
            <button onClick={displayPosts}>
              <i className="fas fa-home"></i>
            </button>
            <button onClick={displayFriends}>
              <i className="fas fa-user-friends"></i>
            </button>
            <button onClick={handleSignOut}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </header>
      <div className="container">
        {isPostsOpen ? <Posts /> : <></>}
        {isFriendsOpen && user.role === 'user' ? <Friends /> : <></>}
      </div>
      <footer className="footer">Copyright © 2022 Michał Osman</footer>
    </>
  )
}

export default Home
