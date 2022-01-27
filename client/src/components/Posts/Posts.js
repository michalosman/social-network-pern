import './Posts.css'
import { useContext, useEffect, useState } from 'react'
import { getUserAvatar } from '../../utils/functions'
import moment from 'moment'
import * as api from '../../api'
import { AuthContext } from '../../context/AuthContext'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data: posts } = await api.getPosts()
    setPosts(posts)
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
          <button className="options-button">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="post-text">{post.text}</div>
      </div>
    ))

  return (
    <main className="posts">
      <form className="box post-form">
        <img className="avatar" src={getUserAvatar(user)} alt="author avatar" />
        <input placeholder={`What's on your mind, ${user.firstName}?`}></input>
      </form>
      {postsBoxes}
    </main>
  )
}

export default Posts
