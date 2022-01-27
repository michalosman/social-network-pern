import React, { createContext } from 'react'
import useAuth from '../hooks/useAuth'
import * as api from '../api'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useAuth()

  const signUp = async (newUserData) => {
    const { data: user } = await api.signUp(newUserData)

    if (user.token) {
      localStorage.setItem('userData', JSON.stringify(user))
      setUser(user)
    }
  }

  const signIn = async (userData) => {
    const { data: user } = await api.signIn(userData)

    if (user.token) {
      localStorage.setItem('userData', JSON.stringify(user))
      setUser(user)
    }

    if (user.isBlocked) {
      localStorage.clear()
      setUser(null)
      alert('Account is blocked')
    }
  }

  const signOut = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
