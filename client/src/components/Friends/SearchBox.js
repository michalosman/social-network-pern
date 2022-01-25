const SearchBox = ({ user }) => {
  return (
    <div className="user-box">
      {user.name}
      <button className="user-button">+</button>
    </div>
  )
}

export default SearchBox
