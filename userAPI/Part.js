module.exports = class Part {

    static isValid(part, allParts) {
  
      let errors = [];
      if (!part.sku) {
        errors.push("Part must have a sku.");
      }
  
      if (!part.descr) {
        errors.push("Part must have a description.");
      }

      if (!part.retail) {
        errors.push("Part must have a retail price.");
      }
  
     if (errors.length > 0) {
       part.errors = errors;
       return false;
     } else {
       return true;
     }
    }
  
    static isUnique(part, allParts) {   
      return allParts.filter((auth) => auth.email === part.email && auth.id !== part.id).length === 0;
    }
  }