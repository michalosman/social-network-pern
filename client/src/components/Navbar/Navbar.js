import './Navbar.css'

const Navbar = () => {
  return (
    <header className="navbar">
      <h1>Social Network</h1>
      <div className="user-panel">
        <p>Username</p>
        <button className="button">Log out</button>
      </div>
    </header>
  )
}

export default Navbar
