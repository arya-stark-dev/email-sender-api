import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    token: '',
  },
  plugins: [createPersistedState()],
  mutations: {
    setUserToken: (state, payload) => {
      state.token = payload;
    },
  },
  actions: {
    updateUserToken: ({ commit }, payload) => {
      commit('setUserToken', payload);
    },
  },
  getters: {
    getUserToken: state => state.token,
  },
  strict: debug,
});
