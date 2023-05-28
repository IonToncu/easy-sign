<template>
  <div class="home">
    <h1>Admin test home page</h1>
  </div>

  <div>
    <h1>{{ folderName }}</h1>
    <v-card class="mx-auto" max-width="80%" max-height="80%">
      <v-item-group selected-class="bg-primary">
        <v-container>
          <v-row>
            <v-col v-for="(candidate, index) in candidates" :key="index" cols="6" md="3">
              <v-item v-slot="{ isSelected, selectedClass, toggle }">
                <CandidateCard :candidate-name="candidate.firstName" :candidate-id="candidate.id"></CandidateCard>
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
      folderName: '',
      candidates: []
    };
  },
  mounted() {
    this.fetchCandidates();
  },
  methods: {
    fetchCandidates() {
      axios
        .get('http://localhost:8075/api/v1/admin/candidates', {
          headers: {
            Authorization: 'bearer_' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          }
        })
        .then(response => {
          this.candidates = response.data.candidate;
          console.log(this.candidates);
        })
        .catch(error => {
          if (error.response.status === 500) {
            localStorage.clear();
            this.$router.push('/login');
          }
          console.log(error);
        });
    },
  },
};
</script>
  
  <style>
  </style>