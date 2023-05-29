<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="80%" height="80%">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">Open document</v-btn>
      </template>
      <v-card height="100%">
        <v-card-title>
          <span class="text-h5">{{ documentName }}</span>
        </v-card-title>
        <iframe ref="pdfViewer" title="PDF" height="100%" :src="fetchPdfData"></iframe>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" variant="text" @click="acceptDocument()" v-show="isNotary">Approve</v-btn>
          <v-btn color="green darken-1" variant="text" @click="declineDocument()" v-show="isNotary">Decline</v-btn>
          <v-btn color="green darken-1" variant="text" @click="dialog = false" v-show="!isNotary">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';
import roles from "../store/module/Roles";

export default {
  data() {
    return {
      dialog: false,
      fetchPdfData: null,
      isNotary: false
    };
  },
  props: {
    documentName: String,
    documentId: Number,
    folderId: Number
  },
  mounted() {
    var FileUrl =  `http://localhost:8075/api/v1/utility/doc/${this.documentId}`;
    
    if(localStorage.getItem("isAuthenticated") === "true"){
      if(localStorage.getItem("role") === roles.NOTAR){ 
      FileUrl = `http://localhost:8075/api/v1/admins/notary/doc/${this.documentId}`;
      this.isNotary = true }
      else FileUrl = `http://localhost:8075/api/v1/customer/doc/${this.documentId}`
    }
     
    this.fetchPdf(FileUrl);
  },
  methods: {
    /**
     * 
     * @param {axios.post('http://localhost:8075/api/v1/reg/registration', {
            username: name + " " + lastName,
            firstName: name,
            lastName: lastName,
            email: email,
            password: password
          }} FileUrl 
     */
    fetchPdf(FileUrl) {
      axios
        .get(FileUrl, {
          folderId: this.folderId
          }, {
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
    acceptDocument(){
      console.log(this.documentId);
      this.getFolderRequest(`http://localhost:8075/api/v1/admins/notary/approve/doc/${this.documentId}`)
    },
    declineDocument(){
      this.getFolderRequest(`http://localhost:8075/api/v1/admins/notary/decline/doc/${this.documentId}`)
    },
    getFolderRequest(URL){
      axios
        .get(URL, {
          headers: {
            Authorization: 'bearer_' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
        window.location.reload();
    }
  }
};
</script>