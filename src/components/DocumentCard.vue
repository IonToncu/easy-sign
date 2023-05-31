<template>
    <v-card
      class="mx-auto"
      max-width="344"
      >
      <v-img
        src="https://cognota.com/wp-content/uploads/2019/09/blueprint.jpg"
        height="200px"
        cover
      ></v-img>
  
      <v-card-title>
        {{ documentName }}
      </v-card-title>
  
      <v-card-subtitle>
        1,000 miles of wonder
      </v-card-subtitle>
  
      <v-card-actions>
        <DocumentModalCard :document-id=documentId :document-name=documentName :folder-id=folderId></DocumentModalCard>
        <v-spacer></v-spacer>
        <v-icon color="yellow" size="x-large" v-show="isPENDING()" >mdi-clock-outline</v-icon>
        <v-icon color="green" size="x-large" v-show="isCHECKED()">mdi-check-circle-outline</v-icon>
        <v-icon color="red" size="x-large" v-show="isDENIED()">mdi-cancel</v-icon>
      </v-card-actions>
  
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
  
          <v-card-text>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </template>   

<script>
import DocumentModalCard from '@/components/DocumentModalCard.vue';
import clockoutline from '../assets/icon/clockoutline.svg';

export default {
  created() {
    this.$vuetify.icons = {
      custom: {
        component: clockoutline,
      },
    };
  },
  components: {
    DocumentModalCard
  },
  data: () => ({
    show: false,
  }),
  props: {
    documentName: String,
    documentId: Number,
    folderId: Number,
    status: String,
    isPublic: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isCHECKED(){
      if(this.status === "CHECKED") return true;
      else return false;
    },
    isDENIED(){
      if(this.status === "DENIED") return true;
      else return false;
    },
    isPENDING(){
      if(this.status === "PENDING") return true;
      else return false;
    }
  },
}
</script>