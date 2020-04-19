module.exports = class Customer {

    static isValid(customer, allCustomers) {
  
      let errors = [];
      if (!customer.fname) {
        errors.push("Customer must have a first name.");
      }
  
      if (!customer.lname) {
        errors.push("Customer must have a last name.");
      }

      if (!customer.streetAddress) {
        errors.push("Customer must have a street address.");
      }

      if (!customer.city) {
        errors.push("Customer must have a city.");
      }

      if (!customer.state) {
        errors.push("Customer must have a state.");
      }

      if (!customer.phoneNumber) {
        errors.push("Customer must have a phone number.");
      }
  
      if (!customer.email) {
        errors.push("Customer must have an email");      
      }
  
     if (!Customer.isUnique(customer, allCustomers)) {
       errors.push("Email is already in use.");
     }
  
     if (errors.length > 0) {
       customer.errors = errors;
       return false;
     } else {
       return true;
     }
    }
  
    static isUnique(customer, allCustomers) {   
      return allCustomers.filter((auth) => auth.email === customer.email && auth.id !== customer.id).length === 0;
    }
  }