import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
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
          <label className="form-label" htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
            placeholder="Write author here"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="url">URL</label>
          <input
            id="url"
            name="url"
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
            placeholder="Write URL here"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm