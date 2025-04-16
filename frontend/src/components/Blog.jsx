//const blog = require("../../../backend/models/blog")

import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  console.log('[PROD DEBUG] Blog:', blog)
  console.log('[PROD DEBUG] Blog.likedBy:', blog.likedBy)
  console.log('[PROD DEBUG] Current user:', user)

  console.log('Has liked check:', blog.likedBy?.some(like => like?.id === user?.id))

  const toggleVisibility = () => {
    if (!visible) {
      setVisible(true)
    }
  }

  const closeDetails = (e) => {
    e.stopPropagation()
    setVisible(false)
  }

  const handleLike = (e) => {
    e.stopPropagation()

    // Add these console logs
    console.log('[PROD DEBUG] handleLike user:', user)
    console.log('[PROD DEBUG] handleLike user.id:', user?.id)
    if (!user?.id) {
      console.error('[PROD DEBUG] ABORTING: user.id is missing!', user)
      return
    }
    console.log('[PROD DEBUG] handleLike blog:', blog)

    // Get the current user's ID from the user object passed as prop
    const userId = user.id

    // Create a minimal update object
    const blogToUpdate = {
      id: blog.id,
      likes: blog.likes,
      likedBy: [userId]
    }

    // Log the update object
    console.log('Sending update:', blogToUpdate)

    updateBlog(blogToUpdate)
  }

  const hasLiked = blog.likedBy?.some(like => like?.id === user?.id) || false

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
            <span>{blog.title} <span className="author" style={{ whiteSpace: 'nowrap' }}>- {blog.user?.name}</span></span>
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
          <div className="blog-content">
            {blog.content}
          </div>
          <div className="blog-actions">
            <button
              className="small"
              onClick={handleLike}
              style={{ opacity: hasLiked ? 0.5 : 1 }}
            >
              {hasLiked ? 'Liked' : 'Like'}
            </button>
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