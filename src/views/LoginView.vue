
<template>
  <v-container fluid class="login-container" >
    <v-card class="login-card" max-width="40%" max-height="80%">
      <v-card-title class="text-center">
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Email"
            required
            :rules="emailRules"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
            outlined
          ></v-text-field>
          <v-btn
            type="submit"
            block
            :disabled="!validateEmail()"
            class="mt-4"
            color="primary"
            @click="login"
          >
            Login
          </v-btn>
          <div style="margin: 10px;">
            <router-link to="/register">Register</router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isValid: false
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', { email: this.email, password: this.password });
    },
    validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
      }

  },

}

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.login-card {
  width: 40%;
  max-height: 80%;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>