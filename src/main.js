import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './assets/css/app.css'
import './assets/css/color.css'
import store from '@/store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
