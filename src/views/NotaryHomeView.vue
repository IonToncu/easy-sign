<template>
  <v-row>
    <v-col cols="2">

        <ModalFromTop class="ModalFromTop"></ModalFromTop>
        <br/>
        <br/>
        <br/>
      

        <v-card
          class="mx-auto"
          max-width="250"
        >
          <v-list density="compact">
            <v-list-subheader>REPORTS</v-list-subheader>

            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
            >
              <template v-slot:prepend>
                <v-icon> {{ item.icon }}</v-icon>
              </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>

      
    </v-col>

    <v-col cols="8">
        <br/>
        <v-card
          class="mx-auto folder-list"
          color="grey-lighten-3"
        >
          <v-row>
            <v-col :cols="3">
              <v-btn-toggle v-model="toggle" color="black" mandatory style="margin-top: 0.5rem;">
                <v-btn value="Personal">
                  <v-text>Personal</v-text>
                </v-btn>
                <v-btn value="Public">
                  <v-text>Public</v-text>
                </v-btn>
              </v-btn-toggle>
            </v-col>

              <v-col :cols="8">
                <v-card-text>
                  <v-text-field
                    :loading="loading"
                    density="compact"
                    variant="solo"
                    label="Search templates"
                    placeholder="Search..."
                    append-inner-icon="mdi-magnify"
                    single-line
                    hide-details
                    :rules="rules"
                    v-model="query"
                    @click:append-inner="onClick"
                  ></v-text-field>
                </v-card-text>
              </v-col>
          </v-row>
        </v-card>
        <br/>

        <v-card class="mx-auto folder-list"  height="45rem">
          <v-item-group selected-class="bg-primary">
              <v-container>
                <v-row>

                <v-col v-for="(publicFolder, index) in publicFolders" :key="index" cols="6" md="3" v-show="!isPersonal">
                <v-item v-slot="{ isSelected, selectedClass, toggle }">
                    <FolderCard :folder-id="publicFolder.id" :is-public="true" ></FolderCard>
                </v-item>
                </v-col>

                <v-col v-for="(personalFolder, index) in personalFolders" :key="index" cols="6" md="3" v-show="isPersonal">
                <v-item v-slot="{ isSelected, selectedClass, toggle }">
                    <FolderCard :folder-id="personalFolder.id" :is-public="false"></FolderCard>
                </v-item>
                </v-col>

                </v-row>
              </v-container>
          </v-item-group>
        </v-card>
      </v-col>

      <v-col cols="2" style="margin-left: -1%;"> 
        <br/>
        <v-card
          class="mx-auto"
          height="51rem"
        >
          <v-list>
            <v-list-subheader>Plain Variant</v-list-subheader>

            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
               variant="elevated"
            >
              <template v-slot:prepend>
                <v-icon > mdi-check-circle</v-icon>
              </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>

          <v-list>
            <v-list-subheader>Tonal Variant</v-list-subheader>

            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              variant="elevated"
            >
              <template v-slot:prepend>
                <v-icon>mdi-folder</v-icon>
              </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
  </v-row>

      <v-dialog
          v-model="dialog"
          width="auto"
        >
      <v-card>
        <v-card-text>
          Please set a password for creating the digital signature, which will be used when signing a document.
        </v-card-text>
        <v-text-field
                  label="Password*"
                  type="password"
                  v-model="password"
                  required
                ></v-text-field>
        <v-card-actions>
          <v-btn color="primary" block @click="createCertificate" :disabled="isLongEnough">Create certificate</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </template>
  
  <script>
import axios from 'axios';
import FolderCard from '@/components/FolderCard.vue';
import { BIconWindowSidebar } from 'bootstrap-vue';


export default {
  components: {
    FolderCard
  },
    data() {
        return {
            publicFolders: [],
            personalFolders: [],
            toggle: "Personal",
            isPersonal: true,
            hasCertificate: false,
            dialog: false,
            password: '',
        }
    },
    mounted() {
      this.loadFolders(); 
      this.checkCertificate();
    },
    watch: {
      toggle: function() {
        this.isPersonal = !this.isPublic();
      },

    },
    computed:{
      isLongEnough() {
        return this.password.length < 5;
      },
    },
    methods: {
      createCertificate(password) {
        try {
          const response = axios.get('http://localhost:8075/api/v1/admins/notary/create_certificate', {
            headers: {
              Authorization: 'bearer_' + localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
            },
            params: {
              password: this.password
            }
          }).then(response => {
            this.dialog = false;
          })
          
          window.location.reload();
        } catch (error) {
          console.error(error);
          // Handle the error
        }
      },
        loadFolders() { 
        axios.get('http://localhost:8075/api/v1/admins/notary/allFolders', {
            headers: {
              Authorization: 'bearer_' + localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
            }
          })
          .then(response => {
            this.publicFolders = response.data.publicFolder;
            this.personalFolders = response.data.personalFolder;
          })
          .catch(error => {
            if (error.response.status == 500) {
            localStorage.clear();
            this.$router.push('/login');
          }
            console.log(error);
          })
      },
      isPublic() {  
        return this.toggle === "Public";
      },
      checkCertificate(){
        
        axios.get('http://localhost:8075/api/v1/admins/notary/check_certificate', {
          headers: {
            Authorization: 'bearer_' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          }
        })
        .then(response => {
          this.hasCertificate = response.data.hasCertificate;
          this.dialog = !this.hasCertificate;
        })
        .catch(error => {
        //   if (error.response.status == 500) {
        //   localStorage.clear();
        //   this.$router.push('/login');
        // }
        //   console.log(error);
        })
      }

    },
    
  };
  </script>
  
  <style>
  </style>