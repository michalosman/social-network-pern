const RequestBox = ({ user }) => {
  return (
    <div className="user-box">
      <div className="user-name">{user.name}</div>
      <div className="button-group">
        <button className="user-button">+</button>
        <button className="user-button">-</button>
      </div>
    </div>
  )
}

export default RequestBox
