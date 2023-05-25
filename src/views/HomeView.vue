<template>
  <div class="static-block"></div>

  <ModalFromTop class="ModalFromTop"></ModalFromTop>

  <div class="search">
    <v-text-field :rules="rules" placeholder="Search..." v-model="query"></v-text-field>
  </div>

  <div class="scrollable-block">
    <div class="content">
      <div class="folder-list-box">
        <div v-for="(boxe, index) in filteredList" :key="index" class="boxe" @click="redirectToFolderPage(boxe.id)">
          <img class="card-img-top" src="@/assets/House_blueprint.jpg" alt="Card image cap">
          <div class="card-body">
            <h4 class="card-title">{{ boxe.fileName }}</h4>
            <p class="card-text">Signed: Shaina Thiel</p>
            <time datetime="3/30/2023" style="margin-right:65%">3/30/2023</time>
            <img src="@/assets/icon/checked.png" class="card-img" alt="STATUS">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalFromTop from '@/components/ModalFromTop.vue';
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    ModalFromTop
  },
  data() {
    return {
      folders: null,
      query: ''
    };
  },
  mounted() {
    this.loadCustomerFolders();
  },
  methods: {
    loadCustomerFolders() {
      axios
        .get('http://localhost:8075/api/v1/customer/folders', {
          headers: {
            Authorization: 'bearer_' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response.data.folders);
          this.folders = response.data.folders;
        })
        .catch(error => {
          if (error.response.status == 500) {
            localStorage.clear();
            this.$router.push('/login');
          }
          console.log(error);
        });
    },
    redirectToFolderPage(folderId) {
      this.$router.push('/folder/' + folderId);
    },
  },
  computed: {
    filteredList() {
      const searchQuery = this.query.toLowerCase();
      console.log(searchQuery);
      if (!searchQuery) {
        return this.folders;
      } else {
        return this.folders.filter(item =>
          item.fileName.toLowerCase().includes(searchQuery)
        );
      }
    },
  },
};
</script>

<style scoped>
.ModalFromTop{
  position:fixed;
  left: 0%;
  margin-top: 10px;
  margin-left: 20px;
  border-radius: 15px;
}
.search{
  width: 65%;
  transform: translate(27%, 30%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.add-folder-button{
  position: fixed;
  color: #ffffff;
  width: 10%;
  transform: translate(1.5%, 0%);
  border-radius: 15px;
  border-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  height: 3rem;
  margin: 10px
}
.home {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 50px 20px;
}
.static-block {
  position: fixed;
  right: 0;
  width: 20%;
  top: 10%;
  background-color: #830000;
}

.static-block-left{
  position: fixed;
  left: 0;
  width: 15%;
  top: 10%;
  height: 85%;
  background-color: #ffffff;
  border-radius: 15px;
  margin: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.static-block {
  position: fixed;
    top: 0;
    right: 0;
    width: 16%;
    top: 79px;
    height: 87%;
    background-color: #ffffff;
    border-radius: 15px;
    margin: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.scrollable-block {
  position: absolute;
    top: 53%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 65%;
    max-height: 80%;
    overflow: auto;
    margin-top: 2%;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.content {
  padding: 20px;
}

.folder-list-box {
  display: flex;
  flex-wrap: wrap;
  height: 50%;
  border-radius: 20px;
}

.boxe {
  width: 17rem;
  height: 300px;
  background-color: #212529;
  border-radius: 10px;
  margin: 10px;
}


::-webkit-scrollbar {
  width: 10px; /* Width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background: #f1f1f100; /* Color of the scrollbar track */
}

::-webkit-scrollbar-thumb {
  background-color: #88888800; /* Color of the scrollbar thumb */
  border-radius: 20px; /* Rounded corners of the thumb */
  border: 3px solid #f1f1f100; /* Border around the thumb */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #55555500; /* Color of the scrollbar thumb on hover */
}

.card {
    border-radius: 7%;
    margin: 3px;
  }
  
  .card-img-top {
    border-top-left-radius: 10%;
    border-top-right-radius: 10%;
  }
  
  .card-title {
    /* margin-right: 75%; */
    font-family: Inter;
    font-size: 24px;
    font-weight: 700;
    color: #ffffffd0;
  }
  
  .card-text {
    width: 65%;
    opacity: 65%;
    color: #ffffffd0;
  }
  
  .card-img {
    height: 45px;
    width: 45px;
    left: 100px;
    position: relative;
    bottom: -24%;
    right: -26px;
    top: -28px;
  }

</style>
