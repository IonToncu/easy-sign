<template>
    <div class="home">
      <h1>Admin home page</h1>
    </div>
    <div>
        <h1>{{ folderName }}</h1>
        <v-card class="mx-auto" max-width="80%" max-height="80%">
        <v-item-group selected-class="bg-primary">
            <v-container>
            <v-row>
                <v-col v-for="(publicFolder, index) in publicFolders" :key="index" cols="6" md="3">
                <v-item v-slot="{ isSelected, selectedClass, toggle }">
                    <!-- <CandidateCard :candidate-name="publicFolder.firstName" :candidate-id="publicFolder.id"></CandidateCard> -->
                    <!-- <h1>{{ candidate.firstName }}</h1> -->
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
import CandidateCard from '@/components/CandidateCard.vue';


export default {
  components: {
    CandidateCard
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
        axios.get('http://localhost:8075/api/v1/admin/notary/allFolders', {
            headers: {
              Authorization: 'bearer_' + localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
            }
          })
          .then(response => {
            this.publicFolders = response.data.publicFolder;
            this.personalFolders = response.data.personalFolder;
            
            console.log(response.data);
            console.log(this.publicFolders);
            console.log(this.personalFolders);
          })
          .catch(error => {
            if(error.response.status == 500){
              localStorage.clear();
              this.$router.push('/login');
            }
            console.log(error);
          })
      },

    },
  };
  </script>
  
  <style>
  </style>