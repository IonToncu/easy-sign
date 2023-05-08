import axios from 'axios';
import jwtDecode from 'jwt-decode';

const state = {
  user: null,
  token: null,
  error: null,
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
  setError(state, error) {
    state.error = error;
  },
  clearError(state) {
    state.error = null;
  },
};

const actions = {
  async login({ commit }, credentials) {
    commit('clearError');
    try {
      const response = await axios.post('/api/login', credentials);
      const { token } = response.data;
      const user = jwtDecode(token);
      commit('setUser', user);
      commit('setToken', token);
      localStorage.setItem('token', token);
    } catch (error) {
      commit('setError', error.response.data.message);
    }
  },
  async logout({ commit }) {
    commit('setUser', null);
    commit('setToken', null);
    localStorage.removeItem('token');
  },
  async checkAuth({ commit }) {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      commit('setUser', user);
      commit('setToken', token);
    }
  },
};

const getters = {
  isAuthenticated(state) {
    return !!state.user;
  },
  getUser(state) {
    return state.user;
  },
  getToken(state) {
    return state.token;
  },
  getError(state) {
    return state.error;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};