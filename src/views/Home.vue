<template>
  <div class="home">
    <form @submit.prevent="onPlayerNameSubmit" v-show="!me.id">
      <label for="player-name-input">Your name</label>
      <input id="player-name-input" v-model="player.name"/>
    </form>
    <div v-if="me.id">
      <h3>Welcome {{ me.name }}!</h3>
      <button @click="copyInvitationLink(me)">Invitation link</button>
      <span v-if="linkCopied">(copied)</span>

      <h4 v-if="playerList.length > 1">Players online</h4>
      <ul>
        <li v-for="p in playersExceptMe(playerList)" :key="p.id">
          {{ p.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Home',
  data () {
    return {
      player: {
        name: '',
        id: uuidv4()
      },
      linkCopied: false
    }
  },
  computed: {
    me () {
      return this.$store.getters.getMe
    },
    playerList () {
      return this.$store.getters.getPlayerList
    }
  },
  methods: {
    onPlayerNameSubmit () {
      this.player.id = uuidv4()
      this.$io.emit('new_player', this.player)
      this.$store.commit('addLoginUser', this.player)
      this.$store.commit('updatePlayerList', JSON.parse(JSON.stringify(this.player)))
    },
    playersExceptMe (players) {
      return players.filter((p) => p.id !== this.me.id)
    },
    async copyInvitationLink (me) {
      const _link = window.origin + '/#/playground/' + me.id
      try {
        const _status = await navigator.clipboard.writeText(_link)
        this.linkCopied = true
      } catch (e) {
        this.linkCopied = false
      }
    }
  }
}
</script>

<style>
.home {
  display: flex;
  justify-content: center;
}
</style>
