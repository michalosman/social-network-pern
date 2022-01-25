import './Posts.css'
import { posts } from '../../assets/dummy_data'
import { user } from '../../assets/dummy_data'
import { getUserAvatar } from '../../utils/functions'
import moment from 'moment'

const Posts = () => {
  const postsBoxes = posts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((post) => (
      <div key={post.id} className="box">
        <div className="post-panel">
          <img
            className="avatar"
            src={getUserAvatar(post.author.name)}
            alt="author avatar"
          />
          <div className="post-info">
            <div className="author-name">{post.author.name}</div>
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
        <img
          className="avatar"
          src={getUserAvatar(user.name)}
          alt="author avatar"
        />
        <input
          placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
        ></input>
      </form>
      {postsBoxes}
    </main>
  )
}

export default Posts
