<template>
    <div class="card mb-2 bg-dark text-white">
      <div class="row no-gutters">
        <div class="col-md-4">
        </div>
        <div class="col-md-12">
          <div class="card-body">
            <h5 class="card-title">My account:</h5>
            <img class="card-img-top" src="@/assets/House_blueprint.jpg" alt="Card image cap">
            <p class="card-text time"><small class="text-muted">Last seen</small></p>
            <div class="d-flex justify-content-center">
              <button class="button-acctivity btn1 mx-2">Notification</button>
              <button class="button-acctivity btn2 mx-2">Activity</button>
            </div>
  
            <h6 class="card-title">This week</h6>
            <div v-for="(item) in items" :key="item.id">
              <NotificationField :folderName="item.message"></NotificationField>
            </div>
  
            <h6 class="card-title">Last week</h6>
            <div v-for="(item) in items" :key="item.id">
              <NotificationField :folderName="item.message"></NotificationField>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import NotificationField from "./Fields/NotificationField.vue";
  import "bootstrap";
  
  export default {
    name: "UserActivityCard",
    components: {
      NotificationField,
    },
    props: {
      msg: String,
    },
    data() {
      return {
        items: [{ message: "name 1" }, { message: "name 2" }],
      };
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  
<style scoped>
.button-acctivity {
  margin-top: 1%;
  margin-bottom: 5%;
  width: 125px;
  height: 35px;
}

.button-acctivity.btn1 {
  margin-right: 10px;
}

.button-acctivity.btn2 {
  margin-left: 10px;
  opacity: 50%;
}

.card {
  position: absolute;
  left: 79%;
  top: 5%;
  width: 20%;
  height: 90%;
  border-radius: 35px;
}

.card-text.time {
  margin-left: -55px;
}

.card-title {
  width: 143px;
  height: 29px;
  font-family: Inter;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 5%;
  margin-left: -10px;
}

.card-text {
  width: 65%;
  opacity: 65%;
}

.card-img {
  margin: 5%;
  max-height: 250px;
  max-width: 250px;
}

.card-img-top {
  border-radius: 20px;
}

/* Responsive Styles */
@media only screen and (max-width: 768px) {
  .card {
    position: static;
    width: 100%;
    height: auto;
    border-radius: 0;
    margin-bottom: 10px;
  }

  .card-body {
    padding: 10px;
  }

  .card-title {
    width: auto;
    margin-left: 0;
  }

  .button-acctivity {
    margin-top: 2%;
    margin-bottom: 2%;
    width: 35%;
    height: 35px;
    font-size: 12px;
  }

  .button-acctivity.btn1 {
    margin-right: 0;
  }

  .button-acctivity.btn2 {
    margin-left: 0;
  }

  .card-text.time {
    margin-left: 0;
    margin-top: 5px;
  }

  .card-img {
    margin: auto;
    max-height: 150px;
    max-width: 150px;
  }

  .card-img-top {
    border-radius: 10px;
  }
}
</style>