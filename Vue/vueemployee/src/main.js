import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import {routes} from './router'
import VeeValidate from 'vee-validate'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

const router = new VueRouter({
  mode:'history',
  routes :routes 
});
new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')