import environment from '@/environment/environment';
import roles from "./module/Roles";
import Vuex from 'vuex';
import router from '@/router';
import authModule from './auth';

const axios = require('axios');


const vuex = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || '',
    user: localStorage.getItem('username')|| '',
    status: '',
    error: null,
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, { username, firstName, lastName, token, isNotary, email }) {
      if(isNotary) {
        authModule.setAuthData(username, firstName, lastName, email, token, roles.NOTAR);
      }else{
        authModule.setAuthData(username, firstName, lastName, email, token, roles.CUSTOMER);
      }

    },
    auth_error(state, error) {
      state.status = 'error';
      state.error = error;
    },
    logout(state) {
      localStorage.clear();
    },
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
    //login for all type of users
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
          const firstName = response.data.firstName;
          const lastName = response.data.lastName;
          const isNotary = response.data.isNotary;
          const username = response.data.username;
          const token = response.data.token;
          
          commit('auth_success', { username, firstName, lastName, token, isNotary, email});
          if(firstName === "ADMIN"){ 
            router.push({ path: '/admin' })}          
          else if(isNotary) router.push({ path: '/notary' })
          else router.push({ path: 'home' }) 
        } catch (error) {console.error(error);}
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

  export default vuex;