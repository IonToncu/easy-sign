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
      <v-card :width="300" style="left: 5.7rem; margin-top: 1%;">
        <template v-slot:title>
          {{ folderName }}
        </template>
      </v-card>

      <v-card class="mx-auto" color="grey-lighten-3" :width="500" :height="60" justify="center" style="left: -0.7rem">
        <v-container style="margin-left: 1rem;">
          <v-row >
            <v-col cols="4" style="margin-top: 0.5rem;">
              <AddDocumentModal :folder-id="itemId" v-show="!isNotary"></AddDocumentModal>
            </v-col>
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
                    <DocumentCard :document-name="document.fileName" :document-id="document.id"></DocumentCard>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </v-card>
      </v-col>

      <v-col cols="3"> 
        <v-card
          class="mx-auto"
          height="48rem"
        >
          <br/>
          <v-row justify="center">
            <v-btn @click="toggleShowAndPostFolder" v-show="!isNotary" size="x-large"
            color="black"
            >
              <v-text>Post folder</v-text>
              <v-icon icon="mdi-cloud-upload" style="margin-left: 10px;"></v-icon>
              </v-btn>
          </v-row>

          <br/><br/>

          <v-row>
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
          </v-row>
        </v-card>
      </v-col>
  </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import DocumentCard from '@/components/DocumentCard.vue';
import AddDocumentModal from '@/components/AddDocumentModal.vue';
import roles from "../store/module/Roles";

export default {
  components: {
    DocumentCard,
    AddDocumentModal
  },
  props: {
      isPublic: Boolean,
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
    };
  },
  created() {
   
  },
  mounted() {    
    this.itemId = this.$route.params.id;
    this.isPublic = localStorage.getItem("isPublic");
    localStorage.removeItem("isPublic"); 

    if(localStorage.getItem("role") != roles.NOTAR){
      this.fetchCustomerFolderData();
    }
    else {
      this.fetchNotaryFolderData()
      this.isNotary = true
    };
  },
  methods: {
    fetchCustomerFolderData() {
      this.getFolderRequest(`http://localhost:8075/api/v1/customer/folder/${this.itemId}`)
    },
    toggleShowAndPostFolder() {
      this.show = !this.show;
      this.postFolder();
    },
    postFolder() {
      axios
        .get(`http://localhost:8075/api/v1/customer/customer_post_Folder/` + this.itemId, {
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
    },
    fetchNotaryFolderData(){
      this.getFolderRequest(`http://localhost:8075/api/v1/admins/notary/folder/${this.itemId}`)
    },
    getToPersonal(){
      axios
        .get(`http://localhost:8075/api/v1/admins/notary/addToPersonal/` + this.itemId, {
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
          this.folderName = response.data.folder.fileName;
          this.documentList = response.data.folder.documentDtoList;
        })
        .catch(error => {
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
