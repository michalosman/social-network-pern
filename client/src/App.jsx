import React, { useContext } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const { user } = useContext(AuthContext)

  if (!user) return <Login />
  return <Home />
}

export default App
