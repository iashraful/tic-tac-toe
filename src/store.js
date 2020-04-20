import Vue from 'vue'
import Vuex from 'vuex'

const state = {
  me: JSON.parse(localStorage.getItem('me')) || {},
  playerList: []
}

const mutations = {
  addLoginUser(state, payload) {
    localStorage.setItem('me', JSON.stringify(payload))
    state.me = payload
  },
  removeLoginUser(state) {
    localStorage.setItem('me', JSON.stringify({}))
    state.me = {}
  },
  updatePlayerList (state, player) {
    state.playerList.push(player)
  },
  setPlayerList (state, players) {
    state.playerList = players
  }
}

const actions = {

}

const getters = {
  getMe (state) {
    return state.me
  },
  getPlayerList (state) {
    return state.playerList
  },
  getPlayerById: state => uuid => {
    console.log(uuid)
    console.log(state.playerList)
    return state.playerList.find((p) => p.id === uuid)
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
