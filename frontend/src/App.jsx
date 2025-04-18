import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import signUpService from './services/signup'
import SignupForm from './components/SignupForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('error')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const[showSignup, setShowSignup] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('[PROD DEBUG] Loaded user from localStorage:', user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
      .catch(error => {
        if (error.message === 'token_expired') {
          handleLogout()
          setNotificationType('error')
          setErrorMessage('Your session has expired. Please log in again.')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      const blogs = await blogService.getAll()
      setBlogs(blogs)

      setNotificationType('success')
      setErrorMessage(`Welcome ${user.name}!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      setNotificationType('error')
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        const blogWithUser = {
          ...returnedBlog,
          user: returnedBlog.user || user
        }
        setBlogs(blogs.concat(returnedBlog))
      })

    setNotificationType('success')
    setErrorMessage(`A new blog "${blogObject.title}" added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
        await blogService.remove(blogToDelete.id)
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))

        setNotificationType('success')
        setErrorMessage(`Deleted "${blogToDelete.title}"`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } catch (error) {
      if (error.message === 'token_expired') {
        handleLogout()
        setNotificationType('error')
        setErrorMessage('Your session has expired. Please log in again.')
      } else {
        setNotificationType('error')
        setErrorMessage('Error deleting blog')
      }
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate.id, blogToUpdate)
      setBlogs(blogs.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      ))
    } catch (error) {
      if (error.message === 'token_expired') {
        handleLogout()
        setNotificationType('error')
        setErrorMessage('Your session has expired. Please log in again.')
      } else {
        setNotificationType('error')
        setErrorMessage('Error updating blog')
      }
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      await signUpService.signup({
        username,
        name,
        password
      })

      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setName('')
      setPassword('')

      setNotificationType('success')
      setErrorMessage(`Welcome ${user.name}! Your account has been created.`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationType('error')
      setErrorMessage(exception.response?.data?.error || 'Error creating account')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} type={notificationType} />
        {showSignup ? (
          <>
            <SignupForm
              handleSubmit={handleSignup}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handleNameChange={({ target }) => setName(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              username={username}
              name={name}
              password={password}
            />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button className="secondary" onClick={() => setShowSignup(false)}>
                Already have an account? Log in
              </button>
            </div>
          </>
        ) : (
          <>
            <LoginForm
              handleSubmit={handleLogin}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              username={username}
              password={password}
            />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button className="secondary" onClick={() => setShowSignup(true)}>
                Don&apos;t have an account? Sign up
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>BLOC</h1>
        <div className="user-info">
          <span>{user.name} logged in</span>
          <button className="secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <Notification message={errorMessage} type={notificationType} />

      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <div className="blog-list">
        {!blogs ? (<div>Loading...</div>) : (
          blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />
            )
        )}
      </div>
    </div>
  )
}

export default App