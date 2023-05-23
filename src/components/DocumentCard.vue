<template>
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
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
        <DocumentModalCard :document-id=documentId :document-name=documentName></DocumentModalCard>
        <v-spacer></v-spacer>
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

export default {
  components: {
    DocumentModalCard
  },
  data: () => ({
    show: false,
  }),
  props: {
    documentName: String,
    documentId: Number
  }
}
</script>