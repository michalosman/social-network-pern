import './Login.css'
import { useContext, useState } from 'react'
import logo from '../../assets/images/logo.png'
import { AuthContext } from '../../context/AuthContext'
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signUp, signIn } = useContext(AuthContext)

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp)
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    signUp({ firstName, lastName, email, password })
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    signIn({ email, password })
  }

  return (
    <div className="login-container">
      <form
        className="box login-form"
        onSubmit={isSignUp ? (e) => handleSignUp(e) : (e) => handleSignIn(e)}
      >
        <img className="login-logo" src={logo} alt="logo" />
        <h1 className="login-title">{isSignUp ? 'Sign up' : 'Sign in'}</h1>
        {isSignUp ? (
          <>
            <input
              className="login-input"
              placeholder="First Name"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="login-input"
              placeholder="Last Name"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        ) : (
          ''
        )}
        <input
          className="login-input"
          placeholder="Email Address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
