module.exports = class WorkOrder {

    static isValid(workOrder, allWorkOrders) {
  
      let errors = [];
      if (!workOrder.custID) {
        errors.push("Work Order must have a customer ID number.");
      }
  
      if (!workOrder.date) {
        errors.push("Work Order must have a valid date.");
      }

      if (!workOrder.partID) {
        errors.push("Work Order must have a sku");
      }
  
     if (errors.length > 0) {
       workOrder.errors = errors;
       return false;
     } else {
       return true;
     }
    }
  
    static isUnique(workOrder, allWorkOrders) {   
      return allWorkOrders.filter((auth) => auth.email === workOrder.email && auth.id !== workOrder.id).length === 0;
    }
  }