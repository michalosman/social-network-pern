import axios from 'axios'
import decode from 'jwt-decode'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

API.interceptors.request.use((req) => {
  const userData = localStorage.getItem('userData')

  if (userData) {
    const userToken = JSON.parse(userData).token

    req.headers.Authorization = `Bearer ${userToken}`

    const decodedToken = decode(userToken)

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      window.location.reload(false)
      alert('Your token expired, please sign in again')
    }
  }
  return req
})

// Users
export const signUp = (newUserData) => API.post('/users/sign-up', newUserData)
export const signIn = (userData) => API.post('/users/sign-in', userData)
export const validateRole = (userData) =>
  API.post('/users/validate-role', userData)
export const warnUser = (userId) => API.put(`/users/warn/${userId}`)
export const blockUser = (userId) => API.put(`/users/block/${userId}`)

// Friends
export const getFriends = () => API.get('/friends')
export const getFriendRequests = () => API.get('/friends/requests')
export const getNotFriends = () => API.get('/friends/not-friends')
export const createFriendRequest = (userId) =>
  API.post(`/friends/request/${userId}`)
export const acceptFriendRequest = (userId) =>
  API.put(`/friends/accept/${userId}`)
export const rejectFriendRequest = (userId) =>
  API.delete(`/friends/reject/${userId}`)
export const removeFriend = (userId) => API.delete(`/friends/remove/${userId}`)

// Posts
export const getPosts = () => API.get('/posts')
export const createPost = (text) => API.post('/posts')
export const addComment = (postId) => API.get(`/posts/add-comment/${postId}`)
export const likePost = (postId) => API.get(`/posts/like/${postId}`)
export const unlikePost = (postId) => API.get(`/posts/unlike/${postId}`)
