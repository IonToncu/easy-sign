<template>
  <Header>
    <nav>
      <router-link @click="home()">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
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
    home() {
      // router.push({ path: 'home' })
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
