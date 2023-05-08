<template>
    <div class="card text-white bg-dark mb-6" style="width: 18rem;">
      <img class="card-img-top" src="@/assets/House_blueprint.jpg" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title">Title</h4>
        <p class="card-text">Signed: Shaina Thiel</p>
        <time datetime="3/30/2023" style="margin-right:65%">3/30/2023</time>
        <img src="@/assets/icon/pending.png" class="card-img" alt="STATUS">
      </div>
    </div>
  </template>
  
  <script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap";
  
  export default {
    name: "FolderCard",
    props: {
      msg: String,
    },
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