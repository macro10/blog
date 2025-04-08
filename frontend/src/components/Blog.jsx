//const blog = require("../../../backend/models/blog")

import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
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
    <div className="blog">
      <div className="blog-basic">
        <span>{blog.title} - <span className="author">{blog.author}</span></span>
        <button className="small secondary" onClick={toggleVisibility}>
          {visible ? 'Hide' : 'View'}
        </button>
      </div>
      {visible && (
        <div className="blog-details">
          <div className="url">{blog.url}</div>
          <div className="likes-container">
            <span>likes {blog.likes}</span>
            <button className="small" onClick={handleLike}>Like</button>
          </div>
          <div>{blog.user?.name}</div>
          <div className="blog-actions">
            {showDeleteButton() && (
              <button className="small danger" onClick={() => deleteBlog(blog)}>Delete</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog