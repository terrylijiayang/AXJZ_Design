import user from './user'
import Vue from  'vue'
import Vuex from 'vuex'
import {getters} from './getters'
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,
  },
  getters
})
