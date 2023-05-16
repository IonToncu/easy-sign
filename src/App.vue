<template>
  <Header>
  </Header>
  
  <router-view/>
</template>

<script>
import Header from "@/components/Header.vue";
import router from "@/router";

export default {
  components: {
    Header,
  },
  methods: {
    homePage() {
      // router.push({ path: 'home' })
      console.log("test")
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body{
  background-color: #0e2445;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
