import Vue from 'vue'
import Vuex from 'vuex'

const state = {
  me: {}
}

const mutations = {
  addLoginUser(state, payload) {
    state.me = payload
  }
}

const actions = {

}

const getters = {

}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
