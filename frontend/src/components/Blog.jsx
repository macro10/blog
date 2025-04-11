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

  return (
    <div
      className="blog"
      onClick={toggleVisibility}
      role="button"
      tabIndex={0}
      style={{ cursor: visible ? 'default' : 'pointer' }}
    >
      <div
        className="blog-basic"
        onClick={visible ? closeDetails : undefined}
        role={visible ? 'button' : undefined}
        tabIndex={visible ? 0 : undefined}
        style={{ cursor: visible ? 'pointer' : 'inherit' }}
      >
        <span>{blog.title} - <span className="author">{blog.user?.name}</span></span>
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