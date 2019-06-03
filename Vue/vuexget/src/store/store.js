import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios,axios);

export default new Vuex.Store({
    //export const store = new Vuex.Store({
    state: {
        arr:[]
    },
    actions:{
        loadData ({commit}){
            axios
            .get("http://localhost:5000/api")
            .then(r => r.data)
            .then(arr =>{
                commit('Set_data',arr)
            })
        }
    },
    mutations:{
        Set_data(state,arr){
            state.arr=arr
        }
    }
})