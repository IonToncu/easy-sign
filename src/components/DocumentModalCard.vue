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
          <v-btn color="green darken-1" variant="text" @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" variant="text" @click="dialog = false">Agree</v-btn>
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
    };
  },
  props: {
    documentName: String,
    documentId: Number
  },
  mounted() {
    var FileUrl = "";
    if(localStorage.getItem("role") === roles.NOTAR) FileUrl = `http://localhost:8075/api/v1/admins/notary/doc/${this.documentId}`
    else FileUrl = `http://localhost:8075/api/v1/customer/doc/${this.documentId}`
    
    this.fetchPdf(FileUrl);
  },
  methods: {
    fetchPdf(FileUrl) {
      axios
        .get(FileUrl, {
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
    }
  }
};
</script>