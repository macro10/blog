// frontend/src/components/Navbar.jsx
import { useState } from 'react'

const Navbar = ({ user, handleLogout, onCreateNew, isBlogFormVisible }) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <div className="logo">BLOG</div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          <div className="navbar-right">
            {!isBlogFormVisible && (
              <button
                onClick={onCreateNew}
                className="primary"
              >
                CREATE NEW
              </button>
            )}
            <div className="user-info">
              <span>{user.name}</span>
              <button className="primary" onClick={handleLogout}>
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-spacer"></div>
    </div>
  )
}

export default Navbar