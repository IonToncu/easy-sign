<template>
  <div>
    <h1>{{ folderName }}</h1>
    <AddDocumentModal :folder-id=itemId></AddDocumentModal>
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

export default {
  components: {
    DocumentCard, AddDocumentModal
  },
  data() {
    return {
      itemId: null,
      folderName: '',
      documentList: [],
    };
  },
  mounted() {
    this.itemId = this.$route.params.id;
    axios
      .get(`http://localhost:8075/api/v1/customer/folder/${this.itemId}`, {
        headers: {
          Authorization: 'bearer_' + localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response.data);
        this.folderName = response.data.folder.fileName;
        this.documentList = response.data.folder.documentDtoList;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {},
};
</script>
<style scoped>
.document-button{
  margin: 0;
  padding: 0;
  color: black;
}
</style>
