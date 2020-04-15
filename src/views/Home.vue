<template>
  <div class="home">
    <form @submit.prevent="onPlayerNameSubmit">
      <label for="player-name-input">Your name</label>
      <input id="player-name-input" v-model="playerName"/>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      playerName: ''
    }
  },
  methods: {
    onPlayerNameSubmit () {
      this.$io.emit('new_player', this.playerName)
      this.$router.push('/playground')
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
