<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10 col-sm-12">
          <div class="card mb-4 bg-dark text-white">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src="@/assets/icon/user_avatar.png"
                  class="card-img"
                  alt="User photo"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">User Name</h5>
                  <p class="card-text">
                    This is a wider card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap";
  
  export default {
    name: "UserInfoCard",
    props: {
      msg: String,
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .card {
    border-radius: 35px;
    margin: 10px;
  }
  
  .card-title {
    margin-right: 20px;
    font-family: Inter;
    font-size: 24px;
    font-weight: 700;
  }
  
  .card-text {
    opacity: 65%;
  }
  
  .card-img {
    margin: 5%;
    max-height: 250px;
    max-width: 550px;
  }
  </style>