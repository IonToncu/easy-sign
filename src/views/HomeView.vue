<template>
  <v-row>
    <v-col cols="2">

        <ModalFromTop class="ModalFromTop"></ModalFromTop>
        <br/>
        <br/>
        <br/>
      

        <v-card
          class="mx-auto"
          max-width="250"
        >
          <v-list density="compact">
            <v-list-subheader>REPORTS</v-list-subheader>

            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
            >
              <template v-slot:prepend>
                <v-icon> {{ item.icon }}</v-icon>
              </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>

      
    </v-col>

    <v-col cols="8">
        <br/>
        <v-card
          class="mx-auto folder-list"
          color="grey-lighten-3"
        >
          <v-card-text>
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
            ></v-text-field>
          </v-card-text>
        </v-card>
        <br/>

        <v-card class="mx-auto folder-list"  height="45rem">
          <v-item-group selected-class="bg-primary">
              <v-container>
              <v-row>
                  <v-col v-for="(folder, index) in filteredList" :key="index"  cols="6" md="3" @click="redirectToFolderPage(folder.id)">
                  <v-item v-slot="{ isSelected, selectedClass, toggle }">
                      <FolderCard :folder-id="folder.id" :folder-title="folder.fileName"></FolderCard>
                  </v-item>
                  </v-col>
              </v-row>
              </v-container>
          </v-item-group>
        </v-card>
      </v-col>

      <v-col cols="2" style="margin-left: -1%;"> 
        <br/>
        <v-card
          class="mx-auto"
          height="51rem"
        >
          <v-list>
            <v-list-subheader>Last update</v-list-subheader>

            <v-list-item
              v-for="(item, i) in folders"
              :key="i"
              :value="item"
              variant="elevated"
            >
              <template v-slot:prepend>
                <v-icon>mdi-folder</v-icon>
              </template>

              <v-list-item-title v-text="item.fileName"></v-list-item-title>
              <v-list-item-subtitle v-text=formatDateTime(item.updated)></v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
  </v-row>
      
    
</template>

<script>
import ModalFromTop from '@/components/ModalFromTop.vue';
import axios from 'axios';
import FolderCard from '@/components/FolderCard.vue';

export default {
  name: 'HomeView',
  components: {
    ModalFromTop, FolderCard
  },
  data() {
    return {
      folders: null,
      query: '',
      items: [
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Shared', icon: 'mdi-account-multiple' },
        { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
      ],
      activity: [
        { type: 'subheader', title: 'Group #1' },
        {
          title: 'Item #1',
          value: 1,
        },
        {
          title: 'Item #2',
          value: 2,
        },
        {
          title: 'Item #3',
          value: 3,
        },
        { type: 'divider' },
        { type: 'subheader', title: 'Group #2' },
        {
          title: 'Item #4',
          value: 4,
        },
        {
          title: 'Item #5',
          value: 5,
        },
        {
          title: 'Item #6',
          value: 6,
        },
      ],
    };
  },
  mounted() {
    this.loadCustomerFolders();
  },
  methods: {
    formatDateTime(timestamp) {
      console.log(timestamp);
      return new Date(timestamp).toLocaleString();
    },
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
.notification{
  margin-left: -2%;
}
.folder-list {
  /* position: fixed; */
  right: 2%;
}
.ModalFromTop{
  position:fixed;
  left: 0%;
  margin-top: 10px;
  margin-left: 25px;
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
