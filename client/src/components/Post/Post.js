import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { getUserAvatar } from '../../utils/functions'
import moment from 'moment'
import * as api from '../../api'
import Comments from '../Comments'
import './Post.css'

const Post = ({ post, posts, setPosts }) => {
  const { user } = useContext(AuthContext)
  const [commentsOpen, setCommentsOpen] = useState(false)

  const handleWarnUser = async (user) => {
    await api.warnUser(user.id)
  }

  const handleBlockUser = async (user) => {
    await api.blockUser(user.id)
  }

  const handleRemovePost = async (post) => {
    await api.removePost(post.id)
    setPosts(posts.filter((oldPost) => oldPost.id !== post.id))
  }

  const handleLikePost = async () => {
    await api.likePost(post.id)
    setPosts(
      posts.map((oldPost) => {
        if (oldPost.id === post.id) {
          return { ...oldPost, likes: [...oldPost.likes, user.id] }
        }
        return oldPost
      })
    )
  }

  const handleUnikePost = async () => {
    await api.unlikePost(post.id)
    setPosts(
      posts.map((oldPost) => {
        if (oldPost.id === post.id) {
          return {
            ...oldPost,
            likes: oldPost.likes.filter((userId) => userId !== user.id),
          }
        }
        return oldPost
      })
    )
  }

  return (
    <div className="box post">
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
        <div className="options-buttons">
          {user.role === 'moderator' ? (
            <button
              className="transparent-button options-button"
              onClick={() => handleWarnUser(post.author)}
            >
              <i className="fas fa-exclamation"></i>
            </button>
          ) : (
            <></>
          )}
          {user.role === 'admin' ? (
            <button
              className="transparent-button options-button"
              onClick={() => handleBlockUser(post.author)}
            >
              <i className="fas fa-ban"></i>
            </button>
          ) : (
            <></>
          )}
          {user.role !== 'user' ? (
            <button
              className="transparent-button options-button"
              onClick={() => handleRemovePost(post)}
            >
              <i className="fas fa-times"></i>
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="post-text">{post.text}</div>
      <div className="post-statistics">
        <div className="likes">
          <i className="fas fa-thumbs-up"></i>
          {post.likes.length}
        </div>
        <div
          className="comments-button"
          onClick={() => setCommentsOpen(!commentsOpen)}
        >
          {`${post.comments.length} comments`}
        </div>
      </div>
      <div className="post-buttons">
        {!post.likes.find((userId) => userId === user.id) ? (
          <button className="transparent-button" onClick={handleLikePost}>
            <i className="far fa-thumbs-up"></i>Like
          </button>
        ) : (
          <button className="transparent-button" onClick={handleUnikePost}>
            <i className="fas fa-thumbs-up"></i>Unlike
          </button>
        )}
        <button
          className="transparent-button"
          onClick={() => setCommentsOpen(!commentsOpen)}
        >
          <i className="far fa-comment"></i>Comment
        </button>
      </div>
      {commentsOpen ? (
        <Comments post={post} posts={posts} setPosts={setPosts} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default Post
