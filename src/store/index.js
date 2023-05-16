import environment from '@/environment/environment';
import Vuex from 'vuex';
import router from '@/router';

const axios = require('axios');

const vuex = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment(state) {
        state.count++;
      }
    },
    actions: {
      increment(context) {
        context.commit('increment');
      }, 
      logout() {
          console.log('test login');
      },
      logout() {
        console.log('test login');
    },
      async login({ commit }, { email, password }) {
        try {
          const response = await axios.post('http://localhost:8075/api/v1/auth/login', {
            username: email,
            password: password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const token = response.data.token;
          router.push({ path: 'home' }) 
          // Set the token in the Vuex store or in a cookie/local storage
        } catch (error) {
          // Handle the error
          console.error(error);
        }
      },
      async registrationCustomer({ commit }, { email, password }) {
        try {
          const response = await axios.post('http://localhost:8075/api/v1/auth/login', {
            username: email,
            password: password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const token = response.data.token;
          console.log(token);
          console.log(email);
          console.log(password);
          // Set the token in the Vuex store or in a cookie/local storage
        } catch (error) {
          // Handle the error
          console.error(error);
        }
      },

      async registrationCustomer({ commit }, {name,
                                              lastName,
                                              email,
                                              password}) {
        try {
          const response = await axios.post('http://localhost:8075/api/v1/reg/registration', {
            username: name + " " + lastName,
            firstName: name,
            lastName: lastName,
            email: email,
            password: password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = response.data;
          console.log(data);
        } catch (error) {
          // Handle the error
          console.error(error);
        }
      },
    },
    getters: {
      getCount(state) {
        return state.count;
      }
    }
  });

export default vuex