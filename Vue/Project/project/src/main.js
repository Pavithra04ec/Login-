import Vue from 'vue'
//import Vue from 'vue/dist/vue'
import App from './App'
import {routes} from './router'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
const router = new VueRouter({
  mode:'history',
  routes :routes 
});
new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
