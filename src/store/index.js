import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import config from '@/config/config'
export default new Vuex.Store({
  state: {
    urlApi : config.URL_API
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
