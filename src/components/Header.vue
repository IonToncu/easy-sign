<template>
    <header class="header">
        <div class="header__logo">
        <img src="../assets/logo.png" alt="EasySign logo" />
        </div>
        <nav class="header__nav">
          <ul>
              <li><router-link to="/home">Home</router-link></li>
              <li><router-link to="/profile">profile</router-link></li>
              <li><router-link @click="logout" to="/login" v-show="isAuthenticated">Logout</router-link></li>
              <li><router-link to="/login" v-show="show && !isAuthenticated">Login</router-link></li>
          </ul>
         
        </nav>
    </header>
</template>
  
  <script>
  export default {
    props: {
      pageTitle: {
        type: String,
        default: "EasySign",
      },
    },
    data() {
      return {
        show: false,
        isAuthenticated: false,
      };
    },
    watch: {
      $route(to) {
        this.updateHeader(to);
      },
    },
    mounted() {
      this.isAuthenticated = localStorage.getItem("isAuthenticated") == "true";
      const url = window.location.href
      this.show = url.includes("login") ? false : true;
    },
    methods: {
      logout() {
        localStorage.clear();
        this.$router.push('/login');
      },
      updateHeader(){
        this.isAuthenticated = localStorage.getItem("isAuthenticated") == "true";
        const url = window.location.href

        if(url.includes("login")) this.show = false
        if(url.includes("register")) this.show = true
      }
  }
    
  };
  </script>
  
<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #121212;
  padding: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  height: 4rem;
}

.header__logo img {
  height: 4rem;
}

.header__nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.header__nav li {
  margin-left: 1rem;
}

.header__nav a {
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
}

.header__nav a:hover {
  color: #ffc107;
}
</style>