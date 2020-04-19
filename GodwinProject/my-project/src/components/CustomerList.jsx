import React from 'react'
import PropTypes from 'prop-types'


function CustomerList({ customer, onEditClicked, onDeleteClicked }) {
  // Notice that the buttons currently don't do anything when clicked.
  return (
    <tr>
      <td className="col-md-3">{customer.id}</td>
      <td className="col-md-3">{customer.fname}</td>
      <td className="col-md-3">{customer.lname}</td>
      <td className="col-md-3">{customer.email}</td>
      <td className="col-md-3 btn-toolbar">
        <button className="btn btn-success btn-sm" onClick={event => onEditClicked(customer)}>
          <i className="glyphicon glyphicon-pencil"></i> Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={event => onDeleteClicked(customer.custID)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  )
}

CustomerList.propTypes = {
  customer: PropTypes.object.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
}

export default function CustomersList({ customers, onEditClicked, onDeleteClicked }) {
  const customerItems = customers.map((customer) => (
    <CustomerList key={customer.id} customer={customer} onEditClicked={onEditClicked} onDeleteClicked={onDeleteClicked} />
  ))

  return (
    <div className="customer-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">Customer ID</th>
            <th className="col-md-3">First Name</th>
            <th className="col-md-3">Last Name</th>
            <th className="col-md-3">Email</th>
            <th className="col-md-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customerItems}
        </tbody>
      </table>
    </div>
  )
}

CustomersList.propTypes = {
  customers: PropTypes.array.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
}
