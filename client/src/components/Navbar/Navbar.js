import './Navbar.css'
import { useContext } from 'react'
import logo from '../../assets/images/logo.png'
import { AuthContext } from '../../context/AuthContext'

const Navbar = ({ onClickPosts, onClickFriends }) => {
  const { user, signOut } = useContext(AuthContext)

  const handleSignOut = () => {
    signOut()
  }

  return (
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
          <button onClick={onClickPosts}>
            <i className="fas fa-home"></i>
          </button>
          <button onClick={onClickFriends}>
            <i className="fas fa-user-friends"></i>
          </button>
          <button onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
