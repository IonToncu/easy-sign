<template>
    <div class="home">
      <h1>Notary home page</h1>
    </div>
    <div>
        <h1>{{ folderName }}</h1>
        <v-card class="mx-auto" max-width="80%" max-height="80%">
        <v-item-group selected-class="bg-primary">
            <v-container>
            <v-row>
                <v-col v-for="(publicFolder, index) in publicFolders" :key="index" cols="6" md="3">
                <v-item v-slot="{ isSelected, selectedClass, toggle }">
                    <FolderCard :folder-id="publicFolder.id"></FolderCard>
                </v-item>
                </v-col>
            </v-row>
            </v-container>
        </v-item-group>
        </v-card>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import FolderCard from '@/components/FolderCard.vue';


export default {
  components: {
    FolderCard
  },
    data() {
        return {
            publicFolders: [],
            personalFolders: []
        }
    },
    mounted() {
      this.loadFolders(); // Call the method to load data when the component is mounted
    },
    methods: {
        loadFolders() {
          console.log("test");
        axios.get('http://localhost:8075/api/v1/admins/notary/allFolders', {
            headers: {
              Authorization: 'bearer_' + localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
            }
          })
          .then(response => {
            console.log("test");
            this.publicFolders = response.data.publicFolder;
            this.personalFolders = response.data.personalFolder;
            
            console.log(response.data);
            console.log(this.publicFolders);
            console.log(this.personalFolders);
          })
          .catch(error => {
            console.log(error);
          })
      },

    },
  };
  </script>
  
  <style>
  </style>