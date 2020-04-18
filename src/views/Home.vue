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
      me: {},
      playerList: [],
      player: {
        name: '',
        id: uuidv4()
      },
      linkCopied: false
    }
  },
  mounted () {
    this.$io.on('ALL_PLAYERS', (players) => {
      this.playerList = players
    })
  },
  methods: {
    onPlayerNameSubmit () {
      this.player.id = uuidv4()
      this.$io.emit('new_player', this.player)
      this.me = this.player
      this.playerList.push(JSON.parse(JSON.stringify(this.player)))
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
