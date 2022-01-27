import './Posts.css'
import { useContext, useEffect, useState } from 'react'
import { getUserAvatar } from '../../utils/functions'
import * as api from '../../api'
import { AuthContext } from '../../context/AuthContext'
import Post from './Post'

const Posts = () => {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    if (user.role === 'user') fetchFriendsPosts()
    else fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const postsBoxes = posts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((post) => (
      <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
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
