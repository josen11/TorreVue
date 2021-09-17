import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import underscore from 'vue-underscore';
import vuetify from './plugins/vuetify'

Vue.use(underscore);
Vue.config.productionTip = false

//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
