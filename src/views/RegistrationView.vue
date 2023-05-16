<template>
    <section class="h-100 bg-dark">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card card-registration my-4">
          <div class="row g-0">
            <div class="col-xl-6 d-none d-xl-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                alt="Sample photo" class="img-fluid"
                style="border-top-left-radius: .25rem; border-bottom-left-radius: .25rem;" />
            </div>
            <div class="col-xl-6">
              <div class="card-body p-md-5 text-black">
                <h3 class="mb-5 text-uppercase">Registration form</h3>

                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input type="text" id="form3Example1m" class="form-control form-control-lg" v-model="firstName"/>
                      <label class="form-label" for="form3Example1m">First name</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input type="text" id="form3Example1n" class="form-control form-control-lg" v-model="lastName"/>
                      <label class="form-label" for="form3Example1n">Last name</label>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input  type="password" id="password" class="form-control form-control-lg" v-model="password"/>
                      <label class="form-label" for="form3Example1m1">Password</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input  type="password" id="password" class="form-control form-control-lg" v-model="confirmPassword"/>
                      <label class="form-label" for="form3Example1m1">Confirm password</label>
                    </div>
                  </div>
                </div>

                <div class="form-outline mb-4">
                  <input type="email" id="email" class="form-control form-control-lg" v-model="email" required>
                  <label class="form-label" for="email">Email address</label>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div>
                    <label for="user-type">User Type:</label>
                      <select id="user-type" v-model="userType" @change="toggleFileUpload">
                        <option value="client">Client</option>
                        <option value="notary">Notary</option>
                      </select>
                    </div>`
                  </div>
                </div>


                <div>
                  <input type="file" @change="handleFileUpload">
                </div>

                <div class="d-flex justify-content-end pt-3">
                  <button type="button" class="btn btn-light btn-lg">Reset all</button>
                  <button type="button" class="btn btn-warning btn-lg ms-2"  :disabled="!email ||
                  !password || !confirmPassword || !firstName || !userType || !lastName" @click="registration()">Submit form</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import store from '@/store';
const axios = require('axios');

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      confirmPassword: '',
      email: '',
      password: '',
      userType: '',
      file: null,
    }
  },
  methods: {
    registration() {
      if (this.userType === 'notary'){
        this.uploadFile()
      }else{
        console.log(this.firstName)
        this.$store.dispatch('registrationCustomer', { 
        name: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password });
      }
      
    },
    toggleFileUpload() {
      if (this.userType !== 'notary') {
        this.showFileUpload = true
      } else {
        this.showFileUpload = false
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0]
    },
    uploadFile() {
      if (!this.file) {
        // No file selected
        return;
      }
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('username', this.firstName + " " + this.lastName);
      formData.append('firstName', this.firstName);
      formData.append('lastName', this.lastName);
      formData.append('email', this.email);
      formData.append('password', this.password);

      axios
        .post('http://localhost:8075/api/v1/reg/registration/notary', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          // File upload success
          console.log('File uploaded:', response.data);
        })
        .catch(error => {
          // File upload error
          console.error('File upload error:', error);
        });
    }
  },

}

</script>