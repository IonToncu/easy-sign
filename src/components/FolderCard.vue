<template>
   <v-img
      src="https://cognota.com/wp-content/uploads/2019/09/blueprint.jpg"
      height="200px"
      cover
    ></v-img>
    
  <v-card
    class="mx-auto"
    max-width="344"
    :title=folderTitle
  >
   

    <v-card-title>
      {{ documentName }}
    </v-card-title>

    <v-card-subtitle>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn @click="openFolder()">Open folder</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        
      </div>
    </v-expand-transition>
  </v-card>
</template>   

<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap";


export default {

    name: "FolderCard",
    props: {
      msg: String,
      folderId: Number,
      isPublic: Boolean,
      folderTitle: String,
    },

    methods: {
      openFolder() {
        localStorage.setItem('isPublic', this.isPublic);
        this.$router.push({ name: 'folder', params: { id: this.folderId }})
      },

    }
  };
  </script>
  
  <style scoped>
  .card {
    border-radius: 7%;
    margin: 3px;
  }
  
  .card-img-top {
    border-top-left-radius: 10%;
    border-top-right-radius: 10%;
  }
  
  .card-title {
    margin-right: 75%;
    font-family: Inter;
    font-size: 24px;
    font-weight: 700;
  }
  
  .card-text {
    width: 65%;
    opacity: 65%;
  }
  
  .card-img {
    height: 45px;
    width: 45px;
    position: absolute;
    bottom: 24%;
    right: 10px;
  }
  
  @media only screen and (max-width: 768px) {
    .card {
      width: 15rem;
    }
    .card-img {
      bottom: 20%;
    }
  }
  
  @media only screen and (max-width: 576px) {
    .card {
      width: 12rem;
    }
    .card-img {
      bottom: 18%;
    }
  }
  </style>