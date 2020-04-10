import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import * as io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

// Vue.use(new VueSocketIO, io('http://localhost:5001'), store)

Vue.use(new VueSocketIO({
  debug: true,
  connection: io('http://localhost:5001')
}))
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
