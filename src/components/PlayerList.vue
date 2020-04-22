<template>
  <div>
    <b-table :data="players" :mobile-cards="false">
      <template slot-scope="props">
        <b-table-column field="name" label="Player name" sortable>
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="actions" label="Actions" sortable>
          <b-button
            type="is-success"
            size="is-small"
            @click="challengeToUser(props.row)">Challenge</b-button>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    name: 'PlayerList',
    props: ['players', 'onPlayerChallenge'],
    methods: {
      challengeToUser (player) {
        this.$emit('onPlayerChallenge', player)
      }
    }
  }
</script>

<style scoped>

</style>
