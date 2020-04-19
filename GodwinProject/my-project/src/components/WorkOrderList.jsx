import React from 'react'
import PropTypes from 'prop-types'


function WorkOrderList ({ workOrder, onEditClicked, onDeleteClicked }) {
  // Notice that the buttons currently don't do anything when clicked.
  return (
    <tr>
      <td className="col-md-3">{workOrder.workOrderNumber}</td>
      <td className="col-md-3">{workOrder.custID}</td>
      <td className="col-md-3">{workOrder.date}</td>
      <td className="col-md-3">{workOrder.partID}</td>
      <td className="col-md-3 btn-toolbar">
      <button className="btn btn-success btn-sm" onClick={event => onEditClicked(workOrder)}>
          <i className="glyphicon glyphicon-pencil"></i> Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={event => onDeleteClicked(workOrder.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  )
}

WorkOrderList.propTypes = {
  workOrder: PropTypes.object.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
}

export default function WorkOrdersList ({ workOrders, onEditClicked, onDeleteClicked }) {
  const workOrderItems = workOrders.map((workOrder) => (
    <WorkOrderList key={workOrder.id} workOrder={workOrder} onEditClicked={onEditClicked} onDeleteClicked={onDeleteClicked} />
  ))

  return (
    <div className="workOrder-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">Order Number</th>
            <th className="col-md-3">Customer ID</th>
            <th className="col-md-3">Date</th>
            <th className="col-md-3">Part Number</th>
          </tr>
        </thead>
        <tbody>
          {workOrderItems}
        </tbody>
      </table>
    </div>
  )
}

WorkOrdersList.propTypes = {
  workOrders: PropTypes.array.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
}
