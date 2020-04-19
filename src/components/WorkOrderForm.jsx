import React from 'react'
import PropTypes from 'prop-types'

WorkOrderForm.propTypes = {
  workOrder: PropTypes.object.isRequired,
  updateWorkOrder: PropTypes.func.isRequired,
  formMode: PropTypes.string.isRequired,
  submitCallback: PropTypes.func.isRequired,
  cancelCallback: PropTypes.func.isRequired
}

export default function WorkOrderForm({ workOrder, updateWorkOrder, formMode, submitCallback, cancelCallback }) {
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

  // In this version, the WorkOrders component needs access to the state so it can initialize the
  // form fields when the edit button is clicked.  Therefore we move the state up.

  const formSubmitted = (event) => {
    // Prevent the browser from re-loading the page.
    event.preventDefault()
    submitCallback()
  }

  return ( 
    <div className="workOrder-form">
      <form onSubmit={formSubmitted}>

      <div className="form-group">
          <label>Order Number</label>
          <input type="text" className="form-control" autoComplete='workOrderNumber' name="workOrderNumber" id="workOrderNumber"
            placeholder="Order Number" value={workOrder.workOrderNumber} onChange={(event) => updateWorkOrder('workOrderNumber', event.target.value)} />
        </div>

        <div className="form-group">
          <label>Customer ID</label>
          <input type="text" className="form-control" autoComplete='custID' name="custID" id="custID"
            placeholder="Customer ID" value={workOrder.custID} onChange={(event) => updateWorkOrder('custID', event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="descr">Date</label>
          <input type="text" className="form-control" autoComplete='date' name="date" id="date"
            placeholder="Date" value={workOrder.date} onChange={(event) => updateWorkOrder('date', event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="retail">Part Number</label>
          <input type="text" className="form-control" autoComplete='partID' name="partID" id="partID"
            placeholder="Part Number" value={workOrder.partID} onChange={(event) => updateWorkOrder('partID', event.target.value)} />
        </div>
        {renderButtons()}
      </form>
    </div>
  )
}
