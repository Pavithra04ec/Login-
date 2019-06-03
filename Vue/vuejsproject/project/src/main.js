import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueInstantLoadingSpinner from 'vue-instant-loading-spinner'
import router from '../'

 Vue.use(VueInstantLoadingSpinner);
Vue.use(VeeValidate);
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
