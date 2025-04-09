import PropTypes from 'prop-types'

const SignupForm = ({
  handleSubmit,
  handleUsernameChange,
  handleNameChange,
  handlePasswordChange,
  username,
  name,
  password
}) => {
  return (
    <div className="login-container">
      <h2 className="login-title">Sign up</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            name="Name"
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default SignupForm