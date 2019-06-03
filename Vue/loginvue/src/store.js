import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios)

const state = {
    token: localStorage.getItem('token')
  }
  const mutations = {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    removeToken (state) {
      state.token = null
      localStorage.removeItem('token')
    }
  }
  const getters = {
    isLoggedIn: state => {
      return state.token != null
    }
  }
  export default new Vuex.Store({
    state,
    getters,
    mutations
  })
//export default new Vuex.Store({


    // state: {
    //     token: '',
    //     err: ''
    // },
    // actions: {
    //     loginData: function ({ commit }, { Email, Password }) {
    //         const payload = {
    //             Email: Email,
    //             Password: Password
    //         }
    //         axios
    //             .post('http://localhost:3000/api/login', payload)
    //             .then(res => {
    //                 console.log(res.data.token);
    //                 commit('setNewToState', { add: res.data.token })
    //                 //this.$router.push(`/profile/${payload.Email}`);
    //             }).catch(err => {
    //                 console.log("error", err.response)
    //                 commit('auth_error', { remove: err })
    //                 if(err.response.error.token=null){
    //                     alert("Unauthorized Access & Enter Correct Password")
    //                 }
    //                 else{
    //                     alert("Invalid Email")
    //                 }
    //                 localStorage.removeItem('token')
    //             })
    //     },
    // },
    // mutations: {
    //     setNewToState(state, { add }) {
    //         state.token = add
    //         //console.log(state.token)
    //     },

    //     auth_error(state, { remove }) {
    //         state.err = remove
    //         console.log("error store", state.err.response.data.token);
    //         if(state.err.response.data.token===null){
    //             alert("Unauthorized Access & Enter Correct Password")
    //         }
    //         else{
    //             alert("Invalid Email")
    //         }
    //     }
    // }
//})
