<template>
    <section class="h-50 bg-dark">
  <div class="container py-3 h-50">
    <div class="row d-flex justify-content-center align-items-center h-50">
      <div class="col">
        <div class="card card-registration my-2">
          <div class="row g-2">
            <div class="col-xl-3 d-none d-xl-block">
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

                <div>
                  <v-col>
                    <v-btn-toggle v-model="userType" color="black" mandatory>
                      <v-btn value="Notar">
                        <v-text>Notar</v-text>
                      </v-btn>
                      <v-btn value="Customer">
                        <v-text>Customer</v-text>
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
               
                  <v-col>
                    <v-file-input
                      multiple
                      label="File input"
                      @change="handleFileUpload"
                      accept="application/pdf"
                      v-show="this.userType === 'Notar'"
                    ></v-file-input>
                  </v-col>
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
      userType: 'Customer',
      file: null,
    }
  },
  methods: {
    registration() {
      console.log("test")  
      console.log(this.userType)  
      if (this.userType === 'Notar'){
        this.uploadFile()
      }else{
        this.$store.dispatch('registrationCustomer', { 
        name: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password });
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