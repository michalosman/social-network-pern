import './Login.css'
import { useState } from 'react'
import logo from '../../assets/images/logo.png'
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true)

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <div className="login-container">
      <form className="box login-form">
        <img className="login-logo" src={logo} alt="logo" />
        <h1 className="login-title">{isSignUp ? 'Sign up' : 'Sign in'}</h1>
        {isSignUp ? (
          <>
            <input className="login-input" placeholder="First Name" />
            <input className="login-input" placeholder="Last Name" />
          </>
        ) : (
          ''
        )}
        <input className="login-input" placeholder="Email Address" />
        <input className="login-input" placeholder="Password" />
        <button className="form-button">
          {isSignUp ? 'SIGN UP' : 'SIGN IN'}
        </button>
      </form>
      <button className="toggle-button" onClick={toggleSignUp}>
        {isSignUp
          ? 'Already have an account? Sign In'
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  )
}

export default Login
