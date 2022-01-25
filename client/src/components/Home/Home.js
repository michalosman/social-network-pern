import './Home.css'
import Posts from '../Posts/Posts'
import logo from '../../assets/images/logo.png'
import { user } from '../../assets/dummy_data'
import Friends from '../Friends/Friends'

const Home = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="left-panel">
            <img className="logo" src={logo} alt="logo" />
            <h1 className="page-name">Social Network</h1>
          </div>
          <div className="right-panel">
            <p>{user.name}</p>
            <button className="button">Log out</button>
          </div>
        </div>
      </header>
      <div className="container">
        <Posts />
        <Friends />
      </div>
      <footer className="footer">Copyright © 2022 Michał Osman</footer>
    </>
  )
}

export default Home
