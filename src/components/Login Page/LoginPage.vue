<template>
    <div class="container">
    <div class="card">
        <div class="card-body">
          <div class="logo-container">
            <img src="../../assets/logo.png" alt="Logo" />
          </div>
          <h2 class="card-title">Login</h2>
          <form>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter password">
            </div>
            <button type="submit" class="btn btn-primary btn-block">Login</button>
          </form>
          <div class="signup-link">
            <a href="#">Don't have an account? Sign up</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: ''
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f6f6f6;
  }
  
  .card {
    max-width: 450px;
    width: 100%;
    border: none;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  
  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 30px;
  }
  
  .logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  
  .logo-container img {
    max-width: 100%;
    height: auto;
  }
  
  .card-title {
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 20px;
    width: 100%;
  }
  
  .form-control {
    border-radius: 30px;
    border: none;
    padding: 18px 30px;
    font-size: 16px;
    font-weight: bold;
    background-color: #f2f2f2;
    color: #333;
    width: 100%;
  }
  
  .btn-primary {
    border-radius: 30px;
    border: none;
    padding: 18px 30px;
    font-size: 16px;
    font-weight: bold;
    background-color: #00a1ff;
    color: #fff;
    transition: all 0.3s;
  }
  
  .btn-primary:hover {
    background-color: #007acc;
  }
  
  .signup-link {
    margin-top: 30px;
    text-align: center;
    font-size: 16px;
  }
  
  .signup-link a {
    color: #007acc;
  }
  </style>