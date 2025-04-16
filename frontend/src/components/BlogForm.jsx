import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      content: newContent,
    })

    setNewTitle('')
    setNewContent('')
  }

  return (
    <div className="blog-form-container">
      <h2 className="blog-form-title">Create New Blog</h2>
      <form onSubmit={addBlog} className="blog-form">
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            placeholder="Write title here"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={newContent}
            onChange={event => setNewContent(event.target.value)}
            placeholder="Write your blog content here"
            maxLength={1500}
          />
          <div className="character-count">
            {newContent.length}/1500 characters
          </div>
        </div>
        <div className="form-actions">
          <button type="submit">Create Blog</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm