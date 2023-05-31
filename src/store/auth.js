
import roles from "./module/Roles";

class Authentication {
  constructor() {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') || '';
    this.username = localStorage.getItem('username') || '';
    this.firstName = localStorage.getItem('firstName') || '';
    this.lastName = localStorage.getItem('lastName') || '';
    this.email = localStorage.getItem('email') || '';
    this.token = localStorage.getItem('token') || '';
    this.role = localStorage.getItem('role') || '';
  }

  setAuthData(username, firstName, lastName, email, token, role) {
    this.isAuthenticated = true;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.token = token;
    this.role = role;

    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    localStorage.setItem('firstName', firstName)  
    localStorage.setItem('lastName', lastName)
    localStorage.setItem('email', email)
    console.log(firstName)
    if(firstName === "ADMIN") localStorage.setItem('role', roles.ADMIN)
    else localStorage.setItem('role', role)
    localStorage.setItem('isAuthenticated', true)
  }

  login(username, password) {
    this.isAuthenticated = true;
    this.user = {
      username: username,
      // Other user properties
    };
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
  }

}

// Create a singleton instance
const auth = new Authentication();

export default auth;