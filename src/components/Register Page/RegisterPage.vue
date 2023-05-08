<template>
    <div class="container">
        <div class="card">
            <div class="registration-form">
            <h2>Registration Form</h2>
            <form>
                <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="name" required>
                </div>
                <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required>
                </div>
                <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" v-model="confirmPassword" required>
                </div>
                <div class="form-group">
                <label for="user-type">User Type</label>
                <select id="user-type" v-model="userType" required>
                    <option value="">--Select User Type--</option>
                    <option value="user">User</option>
                    <option value="notary">Notary</option>
                </select>
                </div>
                <div v-if="userType === 'notary'" class="form-group">
                <label for="document-upload">Upload Document</label>
                <input type="file" id="document-upload" @change="uploadDocument" accept=".pdf">
                </div>
                <div class="form-group">
                <button type="submit" @click.prevent="registerUser">Register</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
        document: null,
      }
    },
    methods: {
      uploadDocument(event) {
        this.document = event.target.files[0]
      },
      registerUser() {
        // Code to register user
        console.log('User registered:', {
          name: this.name,
          email: this.email,
          password: this.password,
          userType: this.userType,
          document: this.document,
        })
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
/* .container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
} */

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  margin-left: 5%;
  margin-right: 5%;

}

label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
}

select {
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
}

.file-upload {
  display: none;
}

.file-upload-label {
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.file-upload-label span {
  margin-right: 1rem;
}

.button {
  background-color: #2a9d8f;
  color: #fff;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: #21867a;
}

.error {
  color: red;
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

.success {
  color: green;
  font-size: 1.2rem;
  margin-top: 0.5rem;
}
</style>