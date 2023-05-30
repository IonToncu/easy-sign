<template>
    <div>
      <!-- <v-row class="buttons">
        <v-col>
          <AddDocumentModal :folder-id="itemId" v-show="!isNotary"></AddDocumentModal>
        </v-col>
        <v-col>
          <v-btn @click="toggleShowAndPostFolder" v-show="!isNotary">
            <v-text>Post folder</v-text>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="toggleShowAndPostFolder" v-show="isNotary && !isPublic">
            <v-text>Approve</v-text>
          </v-btn>
        </v-col>
  
        <v-col>
          <v-btn @click="toggleShowAndPostFolder" v-show="isNotary && !isPublic">
            <v-text>Decline</v-text>
          </v-btn>
        </v-col>
  
        <v-col>
          <v-btn @click="getToPersonal" v-show="isNotary && isPublic">
            <v-text>Get to sign</v-text>
          </v-btn>
        </v-col>
  
      </v-row> -->
      <br/>
      <v-row>
        <v-card :width="300" style="left: 21rem; margin-top: 1%;">
          <template v-slot:title>
            {{ folderName }}
          </template>
        </v-card>
  
        <v-card class="mx-auto" color="grey-lighten-3" :width="500" :height="60" justify="center" style="left: 14.4rem">
          <v-container style="margin-left: 1rem;">
            <v-row >
              <v-col cols="8" >
                <v-card-text >
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
                    style="margin-top: -1.5rem; right: -5rem;"
                  ></v-text-field>
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
  
      </v-row>
      <br/>
      <v-row style="display: flex; justify-content: center;">
        
        <v-col cols="8">
          <v-card class="mx-auto" height="48rem">
            <v-item-group selected-class="bg-primary">
              <v-container>
                <v-row>
                  <v-col v-for="(document, index) in documentList" :key="index" cols="6" md="3" >
                    <v-item v-slot="{ isSelected, selectedClass, toggle }">
                      <DocumentCard :document-name="document.fileName"
                       :document-id="document.id"
                       :status="document.fileStatus"
                       :folder-id="itemId"></DocumentCard>
                    </v-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-item-group>
          </v-card>
        </v-col>
  
        
    </v-row>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import DocumentCard from '@/components/DocumentCard.vue';
  import AddDocumentModal from '@/components/AddDocumentModal.vue';
  import ClipboardJS from 'clipboard';
  import roles from "../store/module/Roles";
  
  export default {
    components: {
      DocumentCard,
      AddDocumentModal
    },
    data() {
      return {
        itemId: null,
        folderName: 'Test folder name',
        documentList: [],
        show: false,
        isNotary: false,
        receivedParameter: null,
        isPublic: false,
        query: '',
        isPosted: false,
        isShared: false,
        folderLink: "",
      };
    },
    created() {
     
    },
    mounted() {    
      this.itemId = this.$route.params.id;
      this.isPublic = localStorage.getItem("isPublic") === "true";
      this.isShared = localStorage.getItem("isShared") === "true";
      this.fetchCustomerFolderData();
  
    //   if(localStorage.getItem("role") != roles.NOTAR){
    //     this.fetchCustomerFolderData();
    //   }
    //   else {
    //     this.fetchNotaryFolderData()
    //     this.isNotary = true
    //   };
    },
    methods: {
    fetchCustomerFolderData() {
        this.getFolderRequest('http://localhost:8075/api/v1/utility/shared_folder/' + this.itemId);
    },
      formatDateTime(timestamp) {
        console.log(timestamp);
        return new Date(timestamp).toLocaleString();
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
            console.log(response.data.folder);
            this.folderName = response.data.folder.fileName;
            this.documentList = response.data.folder.documentDtoList;
            this.isPosted = response.data.isPosted;
            this.isShared = response.data.isShared;
          })
          .catch(error => {
            if (error.response.status == 500) {
            localStorage.clear();
            this.$router.push('/login');
          }
            console.log(error);
          });
      }
  
    },
  };
  </script>
  <style scoped>
  
  .buttons{
    position: absolute;
    display: inline;
    top: 9%;
    left: 1%;
    width: 10%;
  }
  </style>
  