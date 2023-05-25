<template>
  <div>
    <v-row class="buttons">
      <v-col>
        <AddDocumentModal :folder-id="itemId"></AddDocumentModal>
      </v-col>
      <v-col>
        <v-btn @click="toggleShowAndPostFolder">
          <v-text>Post folder</v-text>
        </v-btn>
      </v-col>
    </v-row>

    <h1>{{ folderName }}</h1>
    <v-card class="mx-auto" max-width="80%" max-height="80%">
      <v-item-group selected-class="bg-primary">
        <v-container>
          <v-row>
            <v-col v-for="(document, index) in documentList" :key="index" cols="6" md="3">
              <v-item v-slot="{ isSelected, selectedClass, toggle }">
                <DocumentCard :document-name="document.fileName" :document-id="document.id"></DocumentCard>
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
import DocumentCard from '@/components/DocumentCard.vue';
import AddDocumentModal from '@/components/AddDocumentModal.vue';
import roles from "../store/module/Roles";

export default {
  components: {
    DocumentCard,
    AddDocumentModal
  },
  data() {
    return {
      itemId: null,
      folderName: '',
      documentList: [],
      show: false
    };
  },
  mounted() {
    this.itemId = this.$route.params.id;
    if(localStorage.getItem("role") != roles.NOTAR)this.fetchCustomerFolderData();
    else this.fetchNotaryFolderData();
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
      // axios
      //   .get(`http://localhost:8075/api/v1/customer/customer_post_Folder/` + this.itemId, {
      //     headers: {
      //       Authorization: 'bearer_' + localStorage.getItem('token'),
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   })
      //   .then(response => {
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    fetchNotaryFolderData(){
      console.log("fetchNotaryFolderData")
      this.getFolderRequest(`http://localhost:8075/api/v1/admins/notary/public_folder/${this.itemId}`)
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
