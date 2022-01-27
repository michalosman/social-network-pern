import React, { useContext } from 'react'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const { user } = useContext(AuthContext)

  if (!user) return <Login />
  return <Home />
}

export default App
