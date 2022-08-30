import { environmentService } from '@/services/environments/environment.service';
import { postRequestHandler } from '@/services/handler/request.handler';

const state = {
  user: {},
  isLoadingLogin: false,
  create: null
},

  getters = {
    user: state => state.user,
    isLoadingLogin: state => state.isLoadingLogin,
    create: state => state.create
  },

  mutations = {

    setActiveUser(state, payload) {
      state.user = payload;
    },
    loadingLoginToggle(state) {
      state.isLoadingLogin = !state.isLoadingLogin;
    },
  },

  actions = {
    async login({ state }, payload) {
      await postRequestHandler(`${environmentService}/User/Login`, payload).then(async result => {
        state.user = result.status == 200 ? result.data : result.status;
      });
    },

    getRoutes({commit}){
      commit('setRoutes')
    },

    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    },
    
    async CreateUser({
      state
    }, payload) {
      await postRequestHandler(`${environmentService}/User/CreateUser`, payload).then(async result => {
        state.create = result.status == 200 ? result.data : result.status;
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
