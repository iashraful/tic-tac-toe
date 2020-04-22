<template>
  <div class="home">
    <div class="title main-title">Tic Tac Toe</div>
    <form @submit.prevent="onPlayerNameSubmit" v-show="!me.id">
      <b-field>
        <b-input placeholder="Enter your name" size="is-medium" v-model="player.name"></b-input>
      </b-field>
    </form>
    <div v-if="me.id">
      <div class="greetings">
        <span class="subtitle">Welcome {{ me.name }}!</span>
        <b-button
          type="is-primary"
          outlined
          size="is-small"
          @click="copyInvitationLink(me)">
          Invitation Link
        </b-button>
        <span v-if="linkCopied">(copied)</span>
      </div>
      <hr style="margin-top: 5px"/>

      <div v-if="playRequest">
        {{ playRequestFrom.name }} wants to play with you.
        <b-button @click="playingRequestAccept" type="is-primary" size="is-small">Accept</b-button>
        <b-button @click="playingRequestReject" type="is-danger" size="is-small">Reject</b-button>
      </div>

      <div v-if="playerList.length > 1" class="subtitle">Players online</div>
      <player-list :players="playersExceptMe(playerList)" @onPlayerChallenge="playerChallenge"/>
      <p v-if="playersExceptMe(playerList).length === 0">No active players</p>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import UserMixin from '../mixins/user_mixin'
import PlayerList from '../components/PlayerList'

export default {
  name: 'Home',
  mixins: [UserMixin],
  components: { PlayerList },
  data () {
    return {
      playRequest: false,
      playRequestFrom: {},
      player: {
        name: '',
        id: uuidv4()
      },
      linkCopied: false
    }
  },
  mounted() {
    this.$io.on(`PLAY_REQ_TO_CLIENT`, (data) => {
      if (data.to.id === this.me.id) {
        this.playRequest = true
        this.playRequestFrom = data.from
      }
    })
    this.$io.on('PLAY_REQ_REJECTED_BY_USER', (data) => {
      if (data.from.id === this.me.id) {
        this.playRequest = false
      }
      if (data.to.id === this.me.id) {
        this.$buefy.notification.open({
          message: 'Request rejected.',
          type: 'is-danger'
        })
      }
    })

    // this.$io.on('PLAY_REQ_ACCEPTED_BY_USER', (data) => {
    //   if (data.to.id === this.me.id) {
    //     this.$router.push(`/playground/${data.from.id}`)
    //   }
    // })
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
    },
    playingRequestAccept () {
      this.$io.emit('PLAY_REQ_ACCEPTED', {
        from: this.me,
        to: this.playRequestFrom
      })
      this.$router.push(`/playground/${this.me.id}`)
    },
    playingRequestReject () {
      this.$io.emit('PLAY_REQ_REJECTED', {
        from: this.me,
        to: this.playRequestFrom
      })
    },
    playerChallenge (toPlayer) {
      this.$io.emit('PLAY_REQUEST', {
        from: this.me,
        to: toPlayer
      })
      this.$router.push(`/playground/${toPlayer.id}`)
    }
  }
}
</script>

<style lang="scss">
  .home {
    margin: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .main-title {
      font-weight: 700;
      color: #7a14de;
    }
  }
</style>
