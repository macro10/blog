//const blog = require("../../../backend/models/blog")

import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user, setSearchTerm }) => {
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

  const handleLike = (e) => {
    e.stopPropagation()
    if (!user?.id) {
      return
    }
    const userId = user.id
    const blogToUpdate = {
      id: blog.id,
      likes: blog.likes,
      likedBy: [userId]
    }
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

  const formatContentWithHashtags = (content) => {
    if (!content) return ''
    const words = content.split(/(\s+)/)
    return words.map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <span
            key={index}
            className="hashtag"
            style={{ cursor: 'pointer' }}
            onClick={e => {
              e.stopPropagation()
              setSearchTerm(word)
            }}
          >
            {word}
          </span>
        )
      }
      return word
    })
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
            <span>{blog.title}</span>
          </div>
          <div className="likes-badge">
            {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
          </div>
        </div>
        <div className="blog-time">
          {getRelativeTime(blog.createdAt)} <span className="time-separator">•</span> <span className="author" style={{ whiteSpace: 'nowrap' }}>{blog.user?.name}</span>
        </div>
      </div>
      {visible && (
        <div className="blog-details" onClick={(e) => e.stopPropagation()}>
          <div className="blog-content">
            {formatContentWithHashtags(blog.content)}
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