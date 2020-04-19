import React from 'react'
import PropTypes from 'prop-types'

CustomerForm.propTypes = {
  customer: PropTypes.object.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  formMode: PropTypes.string.isRequired,
  submitCallback: PropTypes.func.isRequired,
  cancelCallback: PropTypes.func.isRequired
}

export default function CustomerForm({ customer, updateCustomer, formMode, submitCallback, cancelCallback }) {
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
        <button type="submit" className="btn btn-primary">Create</button>
      )
    } else {
      return (
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="submit" className="btn btn-danger" onClick={cancelClicked}>Cancel</button>
        </div>
      )
    }
  } // end renderButtons

  // In this version, the Customers component needs access to the state so it can initialize the
  // form fields when the edit button is clicked.  Therefore we move the state up.

  const formSubmitted = (event) => {
    // Prevent the browser from re-loading the page.
    event.preventDefault()
    submitCallback()
  }

  return (
    <div className="customer-form">
      <form className ="customerForm" onSubmit={formSubmitted}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" autoComplete='given-name' name="fname" id="fname"
            placeholder="First Name" value={customer.fname} onChange={(event) => updateCustomer('fname', event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="lname">Last Name</label>
          <input type="text" className="form-control" autoComplete='family-name' name="lname" id="lname"
            placeholder="Last Name" value={customer.lname} onChange={(event) => updateCustomer('lname', event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="streetAddress">Address</label>
          <input type="text" className="form-control" autoComplete='streetAddress' name="streetAddress" id="streetAddress"
            placeholder="Address" value={customer.streetAddress} onChange={(event) => updateCustomer('streetAddress', event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" className="form-control" autoComplete='city' name="city" id="city"
            placeholder="City" value={customer.city} onChange={(event) => updateCustomer('city', event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input type="text" className="form-control" autoComplete='state' name="state" id="state"
            placeholder="MI" value={customer.state} onChange={(event) => updateCustomer('state', event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" className="form-control" autoComplete='phoneNumber' name="phoneNumber" id="phoneNumber"
            placeholder="Phone Number" value={customer.phoneNumber} onChange={(event) => updateCustomer('phoneNumber', event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" className="form-control" autoComplete='email' name="email" id="email"
            placeholder="name@example.com" value={customer.email} onChange={(event) => updateCustomer('email', event.target.value)} />
        </div>
        {renderButtons()}
      </form>
    </div>
  )
}
