import React from 'react'
import PropTypes from 'prop-types'

LoginForm.propTypes = {
  login: PropTypes.object.isRequired,
  updateLogin: PropTypes.func.isRequired,
  formMode: PropTypes.string.isRequired,
  submitCallback: PropTypes.func.isRequired,
  cancelCallback: PropTypes.func.isRequired,
}

export default function LoginForm({ login, updateLogin, formMode, submitCallback, cancelCallback }) {
  const cancelClicked = (event) => {
    event.preventDefault()
    cancelCallback()
  }

  // The form will have two different sets of buttons:
  // * A "Create" button when creating, and
  // * An "Update" and "Cancel" button when updating.
  const renderButtons = () => {
    if (formMode === 'new') {
      return (
          <div>
        {/* <button type="submit" className="btn btn-primary" onSubmit={formSubmitted}>Create</button> */}
        <button type="submit" className="btn btn-primary" onSubmit={userLoggedIn} >Login</button>
        <button type="submit" className="btn btn-danger" onClick={cancelClicked}>Cancel</button>
        </div>
      )
    }
  } // end renderButtons


  // In this version, the Logins component needs access to the state so it can initialize the
  // form fields when the edit button is clicked.  Therefore we move the state up.

  const formSubmitted = (event) => {
    // Prevent the browser from re-loading the page.
    event.preventDefault()
    submitCallback()
  }

  const userLoggedIn = (event) => {
    event.preventDefault()
    login()
  }

  return (
    <div className="login-form">
      {/* <img src={logo} alt="Logo" />  */}
      <form onSubmit={formSubmitted}>

        <div className="form-group">
          <label htmlFor="user">User</label>
          <input type="text" className="form-control" autoComplete='user' name="user" id="user"
            placeholder="User" value={login.user} onChange={(event) => updateLogin('user', event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" autoComplete='password' name="password" id="password"
            placeholder="Password" value={login.password} onChange={(event) => updateLogin('password', event.target.value)} />
        </div>
        {renderButtons()}
      </form>
    </div>
  )
}
