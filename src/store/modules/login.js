//import { environmentService, postRequestHandler, getRequestHandler } from '@/utils/services';
import { postRequestHandler } from '@/services/handler/request.handler';

const state = {
  user: {},
  isLoadingLogin: false,
  apiUrl: null,
  headers: null,
  headersWithFile: null,
},

  getters = {
    user: state => state.user,
    isLoadingLogin: state => state.isLoadingLogin,
    apiUrl: state => state.apiUrl,
    headers: state => state.headers,
    headersWithFile: state => state.headersWithFile,
  },

  mutations = {

    setActiveUser(state, payload) {
      state.user = payload;
    },
    loadingLoginToggle(state) {
      state.isLoadingLogin = !state.isLoadingLogin;
    },
    setHeaders(state, payload) {
      state.headers = {
        'Authorization': `Bearer ${payload}`
      };
    },

    setFileHeaders(state, payload){
      state.headersWithFile = { 'Authorization': `Bearer ${payload}`,'Content-Type': 'multipart/form-data' };
    },
  },

  actions = {
    async login({ state }, payload) {
      state.user = payload;
    },

    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    },
    
    async CreateUser({
      commit,
      state
    }, payload) {
      await postRequestHandler(`${state.apiUrlUser}/users/create`, payload, { headers: state.headers }).then(async result => {
        if (result.status == 201) {
          commit('loadingLoginToggle');
        } else {
          commit('loadingLoginToggle');
        }
      });
    },
  };

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
