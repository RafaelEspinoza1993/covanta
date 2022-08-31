import Vue from 'vue';
import Vuex from 'vuex';
import login from '@/store/modules/login';
import showresult from '@/store/modules/showresult'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules : {
      login,
      showresult,
    }
});
export default store;
