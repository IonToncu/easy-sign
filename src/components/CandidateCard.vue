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
        {{ candidateName }}
      </v-card-title>
  
      <v-card-subtitle>
        1,000 miles of wonder
      </v-card-subtitle>
  
      <v-card-actions>
        <CandidatemodalCard :candidate-id=candidateId :candidate-name=candidateName></CandidatemodalCard>
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
import CandidatemodalCard from './CandidatemodalCard.vue';

export default {
  components: {
    CandidatemodalCard
  },
  data: () => ({
    show: false,
  }),
  props: {
    candidateName: String,
    candidateId: Number
  }
}
</script>