<template>
    <header class="header">
        <div class="header__logo">
        <img src="../assets/logo.png" alt="EasySign logo" />
        </div>
        <nav class="header__nav">
          <ul>
              <router-link to="/home">Home</router-link>
              <li><a href="#">About</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Contact</a></li>
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
  height: 80px;
}

.header__logo img {
  height: 70px;
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