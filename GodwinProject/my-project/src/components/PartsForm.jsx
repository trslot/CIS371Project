import React from 'react'
import PropTypes from 'prop-types'

PartForm.propTypes = {
  part: PropTypes.object.isRequired,
  updatePart: PropTypes.func.isRequired,
  formMode: PropTypes.string.isRequired,
  submitCallback: PropTypes.func.isRequired,
  cancelCallback: PropTypes.func.isRequired
}

export default function PartForm({ part, updatePart, formMode, submitCallback, cancelCallback }) {
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
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="submit" className="btn btn-danger" onClick={cancelClicked}>Cancel</button>
        </div>
      )
    }
  } // end renderButtons

  // In this version, the Parts component needs access to the state so it can initialize the
  // form fields when the edit button is clicked.  Therefore we move the state up.

  const formSubmitted = (event) => {
    // Prevent the browser from re-loading the page.
    event.preventDefault()
    submitCallback()
  }

  return (
    <div className="part-form">
      <form onSubmit={formSubmitted}>
      <div className="form-group">
          <label>Quantity</label>
          <input type="number" className="form-control" autoComplete='qty' name="qty" id="qty"
          placeholder="1" onChange={(event) => updatePart('qty', event.target.value)} />
        </div>
        
        <div className="form-group">
          <label>Sku</label>
          <input type="text" readOnly className="form-control" autoComplete='sku' name="sku" id="sku"
            placeholder="Sku" value={part.sku} onChange={(event) => updatePart('sku', event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="descr">Description</label>
          <input type="text" readOnly className="form-control" autoComplete='descr' name="descr" id="descr"
            placeholder="Description" value={part.descr} onChange={(event) => updatePart('descr', event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="retail">Retail</label>
          <input type="currency" readOnly className="form-control" autoComplete='retail' name="retail" id="retail"
            placeholder="Retail" value={part.retail} onChange={(event) => updatePart('retail', event.target.value)} />
        </div>
        {renderButtons()}
      </form>
    </div>
  )
}
