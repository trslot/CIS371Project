import React from 'react'
import PropTypes from 'prop-types'

function PartList ({ part, onEditClicked, onDeleteClicked }) {
  // Notice that the buttons currently don't do anything when clicked.
  return (
    <tr>
      <td className="col-md-3">{part.id}</td>
      <td className="col-md-3">{part.sku}</td>
      <td className="col-md-3">{part.descr}</td>
      <td className="col-md-3">${part.retail}.00</td>
      <td className="col-md-3 btn-toolbar">
      <button className="btn btn-success btn-sm" onClick={event => onEditClicked(part)}>
          <i className="glyphicon glyphicon-pencil"></i> View
        </button>
        <button className="btn btn-danger btn-sm" onClick={event => onDeleteClicked(part.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  )
}

PartList.propTypes = {
  part: PropTypes.object.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
}

export default function PartsList ({ parts, onEditClicked, onDeleteClicked }) {
  const partItems = parts.map((part) => (
    <PartList key={part.id} part={part} onEditClicked={onEditClicked} onDeleteClicked={onDeleteClicked} />
  ))

  return (
    <div className="part-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">Part Number</th>
            <th className="col-md-3">Sku</th>
            <th className="col-md-3">Description</th>
            <th className="col-md-3">Retail</th>
          </tr>
        </thead>
        <tbody>
          {partItems}
        </tbody>
      </table>
    </div>
  )
}

PartsList.propTypes = {
  parts: PropTypes.array.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
}
