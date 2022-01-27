// This hook handles auto sign in

import decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import * as api from '../api'

const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))

    if (!userData) return

    const decodedToken = decode(userData.token)

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      localStorage.clear()
      return
    }

    const isDataValid = verifyUser(userData)

    if (isDataValid) setUser(userData)
    else localStorage.clear()
  }, [])

  const verifyUser = async (userData) => {
    try {
      const { data } = await api.verifyUser(userData)
      return data.isValid
    } catch (error) {
      console.log('Provided credentials are incorrect')
    }
  }

  return [user, setUser]
}

export default useAuth
