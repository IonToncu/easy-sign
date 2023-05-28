<template>
    <div class="home">
      <h1>Notary home page</h1>
    </div>
    
    <div>
        <h1>{{ folderName }}</h1>
        <!-- toggle button -->
        <div style="display: flex; justify-content: flex-end; margin-right:  0%;">
          <v-btn-toggle v-model="toggle" color="black" mandatory>
            <v-btn value="Personal">
              <v-text>Personal</v-text>
            </v-btn>
            <v-btn value="Public">
              <v-text>Public</v-text>
            </v-btn>
          </v-btn-toggle>
        </div>


        <v-card class="mx-auto" max-width="80%" min-height="80%">
        <v-item-group selected-class="bg-primary">
            <v-container>
            <v-row>

                <v-col v-for="(publicFolder, index) in publicFolders" :key="index" cols="6" md="3" v-show="!isPersonal">
                <v-item v-slot="{ isSelected, selectedClass, toggle }">
                    <FolderCard :folder-id="publicFolder.id" :is-public = true ></FolderCard>
                </v-item>
                </v-col>

                <v-col v-for="(personalFolder, index) in personalFolders" :key="index" cols="6" md="3" v-show="isPersonal">
                <v-item v-slot="{ isSelected, selectedClass, toggle }">
                    <FolderCard :folder-id="personalFolder.id" :is-public = false></FolderCard>
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
            personalFolders: [],
            toggle: "Personal",
            isPersonal: false,
        }
    },
    mounted() {
      this.loadFolders(); // Call the method to load data when the component is mounted
    },
    watch: {
      toggle: function() {
        this.isPersonal = !this.isPublic();
      }
    },
    methods: {
        loadFolders() { 
        axios.get('http://localhost:8075/api/v1/admins/notary/allFolders', {
            headers: {
              Authorization: 'bearer_' + localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
            }
          })
          .then(response => {
            console.log(response.data);
            this.publicFolders = response.data.publicFolder;
            this.personalFolders = response.data.personalFolder;
          })
          .catch(error => {
            console.log(error);
          })
      },
      isPublic() {  
        return this.toggle === "Public";
        },

    },
  };
  </script>
  
  <style>
  </style>