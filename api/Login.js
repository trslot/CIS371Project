module.exports = class Login {

  static isValid(login, allLogins) {

    let errors = [];

    if (!login.user) {
      errors.push("User must have an user name");
    }

    if (!login.password) {
      errors.push("Password must have an password");
    }

    if (!Login.isUnique(login, allLogins)) {
      errors.push("User name is already in use.");
    }

    if (errors.length > 0) {
      login.errors = errors;
      return false;
    } else {
      return true;
    }
  }

  static isUnique(login, allLogins) {
    return allLogins.filter((auth) => auth.user === login.user && auth.id !== login.id).length === 0;
  }
}