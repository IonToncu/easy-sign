import Vuex from 'vuex';

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
          console.log('logout');
      },
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
    },
    getters: {
      getCount(state) {
        return state.count;
      }
    }
  });

export default vuex