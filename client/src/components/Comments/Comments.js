import React, { useState } from 'react'
import { getUserAvatar } from '../../utils/functions'
import moment from 'moment'
import * as api from '../../api'
import './Comments.css'

const Comments = ({ post, posts, setPosts }) => {
  const [text, setText] = useState('')

  const handleAddComment = async (e) => {
    e.preventDefault()
    const { data: comment } = await api.addComment(post.id, text)

    setPosts(
      posts.map((oldPost) => {
        if (oldPost.id === post.id) {
          return { ...post, comments: [...post.comments, comment] }
        }
        return oldPost
      })
    )
    setText('')
  }

  const commentBoxes = post.comments
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((comment) => (
      <div key={comment.id} className="comment">
        <img
          className="avatar"
          src={getUserAvatar(comment.author)}
          alt="comment author avatar"
        />
        <div className="comment-cloud">
          <div className="comment-info">
            <p className="comment-author">{`${comment.author.firstName} ${comment.author.lastName}`}</p>
            <p className="comment-time">
              {moment(comment.createdAt).fromNow()}
            </p>
          </div>
          <p>{comment.text}</p>
        </div>
      </div>
    ))

  return (
    <div className="scroll-container">
      <form onSubmit={(e) => handleAddComment(e)}>
        <input
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <div className="comments scroll">{commentBoxes}</div>
    </div>
  )
}

export default Comments
