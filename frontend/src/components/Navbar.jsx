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
                className="tertiary"
              >
                CREATE NEW
              </button>
            )}
            <div className="user-info">
              <button className="logout-button primary" onClick={handleLogout}>
                <span className="username-text">{user.name}</span>
                <span className="logout-text">LOGOUT</span>
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