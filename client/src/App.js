import React from 'react'
import Home from './components/Home/Home'
import { user } from './assets/dummy_data'
import Login from './components/Login/Login'

const App = () => {
  if (!user) return <Login />
  return <Home />
}

export default App
