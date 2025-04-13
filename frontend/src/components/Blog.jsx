//const blog = require("../../../backend/models/blog")

import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    if (!visible) {
      setVisible(true)
    }
  }

  const closeDetails = (e) => {
    e.stopPropagation()
    setVisible(false)
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    updateBlog(updatedBlog)
  }

  const showDeleteButton = () => {
    return blog.user && user && blog.user.username === user.username
  }

  const getRelativeTime = (dateString) => {
    const now = new Date()
    const past = new Date(dateString)
    const diffInSeconds = Math.floor((now - past) / 1000)

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    }

    for (const [unit, seconds] of Object.entries(intervals)) {
      const difference = Math.floor(diffInSeconds / seconds)
      
      if (difference >= 1) {
        return difference === 1 
          ? `1 ${unit} ago`
          : `${difference} ${unit}s ago`
      }
    }

    return 'just now'
  }

  return (
    <div
      className="blog"
      onClick={toggleVisibility}
      role="button"
      tabIndex={0}
    >
      <div
        className="blog-basic"
        onClick={visible ? closeDetails : undefined}
        role={visible ? 'button' : undefined}
        tabIndex={visible ? 0 : undefined}
      >
        <div className="blog-header">
          <div className="blog-title-container">
            <span className="blog-title">{blog.title}</span>
            <span className="author"> - {blog.user?.name}</span>
          </div>
          <div className="likes-badge">
            {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
          </div>
        </div>
        <div className="blog-time">
          {getRelativeTime(blog.createdAt)}
        </div>
      </div>
      {visible && (
        <div className="blog-details" onClick={(e) => e.stopPropagation()}>
          <div className="blog-content">{blog.content}</div>
          <div className="likes-container">
            <span>likes {blog.likes}</span>
            <button className="small" onClick={(e) => {
              e.stopPropagation()
              handleLike()
            }}>Like</button>
          </div>
          <div className="blog-actions">
            {showDeleteButton() && (
              <button
                className="small danger"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteBlog(blog)
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog