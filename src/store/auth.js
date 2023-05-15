import axios from 'axios';
import jwtDecode from 'jwt-decode';

const authModule = {
  state: {
    token: localStorage.getItem('token') || '',
    user: null,
    status: '',
    error: null,
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, { token, user }) {
      state.token = token;
      state.user = user;
      state.status = 'success';
      state.error = null;
    },
    auth_error(state, error) {
      state.status = 'error';
      state.error = error;
    },
    logout(state) {
      state.token = '';
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, { email, password }){
      commit('auth_request');
      try {
        const response = await axios.post('/api/auth/login', { email, password });
        const token = response.data.token;
        const user = jwtDecode(token);
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = token;
        commit('auth_success', { token, user });
      } catch (error) {
        commit('auth_error', error);
        localStorage.removeItem('token');
      }
    },



    logout({ commit }) {
      commit('logout');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
    authStatus: state => state.status,
    authToken: state => state.token,
    authError: state => state.error,
  },
};

export default authModule;