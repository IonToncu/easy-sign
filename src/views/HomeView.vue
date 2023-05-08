<template>
  <div class="static-block"></div>
  <div class="static-block-left"></div>

  <div class="scrollable-block">
  <div class="content">
    <div class="folder-list-box">
        <div v-for="(boxe, index) in boxes" :key="index" class="boxe">
          <img class="card-img-top" src="@/assets/House_blueprint.jpg" alt="Card image cap">
          <div class="card-body">
            <h4 class="card-title">Title</h4>
            <p class="card-text">Signed: Shaina Thiel</p>
            <time datetime="3/30/2023" style="margin-right:65%">3/30/2023</time>
            <img src="@/assets/icon/denied.png" class="card-img" alt="STATUS">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import FolderCard from '@/components/FolderCard.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      boxes: [1, 2, 3, 4, 5, 6, 1, 2, 3, 2, 3, 4, 5, 6, 1, 2] // You can replace this with your own data
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 50px 20px;
}
.static-block {
  position: fixed;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  background-color: #120101;
}

.static-block-left{
  position: fixed;
  top: 0;
  left: 0;
  width: 15%;
  height: 100%;
  background-color: #f7f9fc;
}
.static-block {
  position: fixed;
  top: 0;
  right: 0;
  width: 15%;
  height: 100%;
  background-color: #000000;
}
.scrollable-block {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65%;
  max-height: 95%;
  overflow: auto;
  /* border: 1px solid #ccc; */
  border-radius: 20px;
  background-color: #ffffff;
}

.content {
  padding: 20px;
}

.folder-list-box {
  display: flex;
  flex-wrap: wrap;
  border-radius: 20px;
}

.boxe {
  width: 17rem;
  height: 300px;
  background-color: #ccc;
  border-radius: 10px;
  margin: 10px;
}


::-webkit-scrollbar {
  width: 10px; /* Width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background: #f1f1f1; /* Color of the scrollbar track */
}

::-webkit-scrollbar-thumb {
  background-color: #88888800; /* Color of the scrollbar thumb */
  border-radius: 20px; /* Rounded corners of the thumb */
  border: 3px solid #f1f1f1; /* Border around the thumb */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Color of the scrollbar thumb on hover */
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
    left: 100px;
    position: relative;
    bottom: -24%;
    right: -26px;
    top: -28px;
  }

</style>
