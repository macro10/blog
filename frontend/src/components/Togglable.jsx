import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    const newVisibility = !visible
    setVisible(newVisibility)
    if (props.onToggle) {
      props.onToggle(newVisibility)
    }
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className="togglable-container">
      <div style={hideWhenVisible} className="togglable-show">
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglable-content">
        {props.children}
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onToggle: PropTypes.func
}

Togglable.displayName = 'Togglable'

export default Togglable