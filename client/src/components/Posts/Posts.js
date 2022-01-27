import './Posts.css'
import { useContext, useEffect, useState } from 'react'
import { getUserAvatar } from '../../utils/functions'
import moment from 'moment'
import * as api from '../../api'
import { AuthContext } from '../../context/AuthContext'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)
  const [text, setText] = useState('')

  useEffect(() => {
    if (user.role === 'user') fetchFriendsPosts()
    else fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data: posts } = await api.getPosts()
    setPosts(posts)
  }

  const fetchFriendsPosts = async () => {
    const { data: friendsPosts } = await api.getFriendsPosts()
    setPosts(friendsPosts)
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    const { data: post } = await api.createPost(text)
    setPosts([...posts, post])
    setText('')
  }

  const handleWarnUser = async (user) => {
    await api.warnUser(user.id)
  }

  const handleBlockUser = async (user) => {
    await api.blockUser(user.id)
  }

  const postsBoxes = posts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((post) => (
      <div key={post.id} className="box">
        <div className="post-panel">
          <img
            className="avatar"
            src={getUserAvatar(post.author)}
            alt="author avatar"
          />
          <div className="post-info">
            <div className="author-name">{`${post.author.firstName} ${post.author.lastName}`}</div>
            <div className="time-info">{moment(post.createdAt).fromNow()}</div>
          </div>
          {user.role === 'moderator' ? (
            <button
              className="options-button"
              onClick={() => handleWarnUser(post.author)}
            >
              <i class="fas fa-exclamation"></i>
            </button>
          ) : (
            <></>
          )}
          {user.role === 'admin' ? (
            <button
              className="options-button"
              onClick={() => handleBlockUser(post.author)}
            >
              <i class="fas fa-ban"></i>
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="post-text">{post.text}</div>
      </div>
    ))

  return (
    <main className="posts">
      <form className="box post-form" onSubmit={(e) => handleCreatePost(e)}>
        <img className="avatar" src={getUserAvatar(user)} alt="author avatar" />
        <input
          placeholder={`What's on your mind, ${user.firstName}?`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      {postsBoxes}
    </main>
  )
}

export default Posts
