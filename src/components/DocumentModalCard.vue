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
          <v-btn color="green darken-1" variant="text" @click="acceptDocument()" v-show="isNotary && !isPublic">Approve</v-btn>
          <v-btn color="green darken-1" variant="text" @click="declineDocument()" v-show="isNotary && !isPublic">Decline</v-btn>
          <v-btn color="green darken-1" variant="text" @click="dialog = false" v-show="!isNotary || isPublic">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <v-dialog
          v-model="dialogPassword"
          width="auto"
        >
      <v-card>
        <v-card-text>
          Please enter the password for the private key
        </v-card-text>
        <v-text-field
                  label="Password*"
                  type="password"
                  v-model="password"
                  required
                ></v-text-field>
        <v-card-actions>
          <v-btn color="primary" block @click="checkPassword" :disabled="isLongEnough">Sign</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';
import roles from "../store/module/Roles";

export default {
  data() {
    return {
      dialog: false,
      fetchPdfData: null,
      isNotary: false,
      isPrivate: false,
      isPublic: false,
      dialogPassword: false,
      password: '',
    };
  },
  props: {
    documentName: String,
    documentId: Number,
    folderId: Number, 

  },
  computed:{
    isLongEnough() {
      return this.password.length < 5;
    },
  },
  mounted() {
    var FileUrl =  '';
    this.isPublic = localStorage.getItem("isPublic") === "true";

    const url = window.location.href
    if(url.includes("shared")){
      FileUrl =  `http://localhost:8075/api/v1/utility/doc`;
      this.fetchSharedPdf(FileUrl, this.documentId, this.folderId);
    }else if(localStorage.getItem("isAuthenticated") === "true"){
      if(localStorage.getItem("role") === roles.NOTAR){ 
      FileUrl = `http://localhost:8075/api/v1/admins/notary/doc/${this.documentId}`;
      this.isNotary = true }
      else FileUrl = `http://localhost:8075/api/v1/customer/doc/${this.documentId}`
      this.fetchPdf(FileUrl);
    }

  },
  methods: {
    checkPassword(){
      this.dialogPassword = false;

      const config = {
        headers: {
          Authorization: 'bearer_' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
        },
        params: {
          docId: this.documentId,
          password: this.password
        }
      };

      axios.get('http://localhost:8075/api/v1/admins/notary/approve/doc/', config)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      window.location.reload();
    },
    fetchPdf(FileUrl) {
      axios
        .get(FileUrl, {
          headers: {
            Authorization: 'bearer_' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob'
        })
        .then(response => {
          this.fetchPdfData = URL.createObjectURL(response.data);
        })
        .catch(error => {
          // Handle the error
        });
    },
    fetchSharedPdf(FileUrl, docId, folderId) {
      axios.get(FileUrl, {
          params: {
            "folderId": folderId,
            "docId": docId
          },
          responseType: 'blob' // Set the response type to 'arraybuffer' to handle binary data
        })
        .then(response => {
          this.fetchPdfData = URL.createObjectURL(response.data);
        })
        .catch(error => {
          // Handle the error
        });
    },
    acceptDocument(){
      this.dialogPassword = true;
      this.dialog = false;
      // this.getFolderRequest(`http://localhost:8075/api/v1/admins/notary/approve/doc/${this.documentId}`)
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
        })
        .catch(error => {
          console.log(error);
        });
        window.location.reload();
    }
  }
};
</script>