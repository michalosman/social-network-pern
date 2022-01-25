import './Navbar.css'
import logo from '../../assets/images/logo.png'
const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-panel">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="page-name">social network</h1>
      </div>
      <div className="nav-panel">
        <p>Michał Osman</p>
        <button className="button">Log out</button>
      </div>
    </header>
  )
}

export default Navbar
