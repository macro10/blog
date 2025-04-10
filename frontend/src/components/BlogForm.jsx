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
      <h2 className="blog-form-title">Create new blog</h2>
      <form onSubmit={addBlog}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title</label>
          <input
            id="title"
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
            maxLength={250}
            rows={4}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm