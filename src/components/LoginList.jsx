import React from 'react'
import PropTypes from 'prop-types'

function LoginList ({ login }) {
  // Notice that the buttons currently don't do anything when clicked.
  return (
    <tr>
      <td className="col-md-3">{login.user}</td>
      <td className="col-md-3">{login.password}</td>
      <td className="col-md-3 btn-toolbar">

      </td>
    </tr>
  )
}

LoginList.propTypes = {
  login: PropTypes.object.isRequired
}

export default function LoginsList ({ logins }) {
  const loginItems = logins.map((login) => (
    <LoginList key={login.id} login={login} />
  ))

  return (
    <div className="login-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">User</th>
            <th className="col-md-3">Email</th>
          </tr>
        </thead>
        <tbody>
          {loginItems}
        </tbody>
      </table>
    </div>
  )
}

LoginsList.propTypes = {
  logins: PropTypes.array.isRequired
}
