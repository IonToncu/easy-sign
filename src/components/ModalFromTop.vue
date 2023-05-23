<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Add Folder
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Folder</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              
              <v-col cols="12" sm="6" md="4" >
                <v-text-field
                  label="Folder name*"
                  hint="example of helper text only on focus"
                  v-model="folderName"
                ></v-text-field>
              </v-col>

              <v-col cols="8">
                <v-text-field
                  label="Description"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              <v-file-input clearable label="Background for folder"></v-file-input>
              </v-col>
              <v-col
                cols="13"
                sm="6"
              >
                <v-autocomplete
                  :items="['Education and learning',
                            'Proof of identity or qualifications',
                            'Financial transactions',
                            'Legal and administrative purposes']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false, createFolder()"
          >
          Create Folder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const axios = require('axios');
  export default {
    // data: () => ({
    //   dialog: false,
    //   folderName: '',
    // }),
    data() {
    return {
      email: '',
      folderName: '',
      dialog: false
    }
  },
    methods: {
      createFolder() {
        const formData = new FormData();
        formData.append('fileName', this.folderName);
        axios
          .post('http://localhost:8075/api/v1/customer/creation_folder', formData, {
            headers: {
              Authorization: 'bearer_' + localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
            }
          })
          .then(response => {
            // File upload success
            console.log('File uploaded:', response.data);
          })
          .catch(error => {
            // File upload error
            console.error('File upload error:', error);
            //if session expired
            // localStorage.removeItem('isAuthenticated');
            // localStorage.removeItem('token');
            if (error.response.status == 500) {
              this.$router.push('/login');
            }
          });

          
        },
    },
  }
</script>