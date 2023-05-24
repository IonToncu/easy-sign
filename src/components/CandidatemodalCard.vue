<template>
    <v-row justify="center">
      <v-dialog v-model="dialog" width="80%" height="80%">
        <template v-slot:activator="{ props }">
          <v-btn  v-bind="props">Open candidate</v-btn>
        </template>
        <v-card height="100%">
          <v-card-title>
            <span class="text-h5">{{ candidateName }}</span>
          </v-card-title>
            <iframe ref="pdfViewer" title="PDF" height="100%" :src=fetchPdfData></iframe>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" variant="text" @click="dialog = false, acceptCandidate()">Accept</v-btn>
            <v-btn color="green darken-1" variant="text" @click="dialog = false, declineCandicate()">Decline</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        dialog: false,
        fetchPdfData: null,
      };
    },
    props: {
        candidateName: String,
        candidateId: Number
    },
    mounted() {
      axios.get('http://localhost:8075/api/v1/admin/candidate_document/' + this.candidateId, {
        headers: {
              Authorization: 'bearer_' + localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob' // Set the response type to 'blob' to handle binary data
        })
        .then(response => {
            this.fetchPdfData = URL.createObjectURL(response.data);
        })
        .catch(error => {
            // Handle the error
        });
    },
    methods: {
        acceptCandidate(){
            axios.get('http://localhost:8075/api/v1/admin/candidates/approve/' + this.candidateId, {
                headers: {
                    Authorization: 'bearer_' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data',
                },
                })
                .then(response => {
                    console.log(response);
                    window.location.reload()
                })
                .catch(error => {
                    // Handle the error
                });
        },
        declineCandicate(){
            axios.get('http://localhost:8075/api/v1/admin/candidates/delete/' + this.candidateId, {
                headers: {
                    Authorization: 'bearer_' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data',
                },
                })
                .then(response => {
                    console.log(response);
                    window.location.reload()
                })
                .catch(error => {
                    // Handle the error
                });
        }
    },
  };
  </script>