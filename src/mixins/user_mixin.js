export default {
  name: 'UserMixin',
  computed: {
    me () {
      return this.$store.getters.getMe
    },
    playerList () {
      return this.$store.getters.getPlayerList
    }
  }
}
