import { environmentService } from '@/services/environments/environment.service';
import { postRequestHandler, getRequestHandler } from '@/services/handler/request.handler';

const state = {
  user: {},
  isLoadingLogin: false,
  apiUrl: null,
  headers: null,
  headersWithFile: null,
  routes: null
},

  getters = {
    user: state => state.user,
    isLoadingLogin: state => state.isLoadingLogin,
    apiUrl: state => state.apiUrl,
    headers: state => state.headers,
    headersWithFile: state => state.headersWithFile,
    routes: state => state.routes
  },

  mutations = {

    setActiveUser(state, payload) {
      state.user = payload;
    },
    loadingLoginToggle(state) {
      state.isLoadingLogin = !state.isLoadingLogin;
    },
    setHeaders(state) {
      state.headers = {
        'content-type': 'text/plain'
      };
    },

    setFileHeaders(state, payload){
      state.headersWithFile = { 'Authorization': `Bearer ${payload}`,'Content-Type': 'multipart/form-data' };
    },

    setRoutes(state){
      let validateLogin = state.user.length === 0
      state.routes= validateLogin ? [
        {
          path: '/',
          name: 'login',
          component: () => import('@/views/LoginView')
        },
        {
          path: '/signup',
          name: 'signup',
          component: () => import('@/components/loginComponents/singUpComponent')
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: () => import('@/components/loginComponents/forgotPasswordComponent')
        }
      ] : [
        {
          path: '/',
          name: 'Dashboard',
          component: () => import('@/views/DashboardView')
        },
      ]
    }
  },

  actions = {
    async login({ state, commit }, payload) {
      commit('setHeaders');
      commit('setRoutes');
      state.user = payload;
      await getRequestHandler(`${environmentService}/Historic/FuchoTest`).then(async result => {
        return result;
      });
      /*await postRequestHandler(`${environmentService}/Login`, payload).then(async result => {
        state.user = result;
        return result;
      });*/
    },

    getRoutes({commit}){
      commit('setRoutes')
    },

    async test({commit}){
      commit('setHeaders');
      commit('setRoutes')
      await getRequestHandler(`${environmentService}/FuchoTest`).then(async result => {
        return result;
      });
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
