import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import VueRouter from 'vue-router'
import { routes } from './router'


Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(BootstrapVue)
Vue.use(VueRouter)
import store from './store/store.js'
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
