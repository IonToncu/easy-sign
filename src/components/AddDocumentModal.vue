<template>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="1024">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props">Add document</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Add Document</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Document name*"
                    hint="example of helper text only on focus"
                    v-model="documentName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-file-input
                    clearable
                    label="Document"
                    v-model="file"
                    accept="application/pdf"
                    @change="handleFileUpload"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" variant="text" @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              variant="text"
              @click="dialog = false; addDocumentToFolder()"
            >
              Add document
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
        folderId: Number
    },
    data() {
      return {
        email: '',
        documentName: '',
        file: null,
        dialog: false
      };
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0]
        },
        addDocumentToFolder() {
            console.log("this.file");
            if (!this.file || !this.documentName) {
            // Validate if file and document name are provided
            return;
            }
    
            const formData = new FormData();
            console.log(this.file);
            console.log(this.documentName);
            console.log(this.folderId);
            formData.append('file', this.file);
            formData.append('filename', this.documentName);
            formData.append('folderId', this.folderId);
            
            axios
            .post('http://localhost:8075/api/v1/customer/add_document', formData, {
                headers: {
                Authorization: 'bearer_' + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log('File uploaded:', response.data);
            })
            .catch(error => {
                console.error('File upload error:', error);
                if (error.response && error.response.status === 500) {
                this.$router.push('/login');
                }
            });
        }
    }
  };
  </script>