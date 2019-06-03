import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        totalCount: 10,
        isLarryHappy: true,
        isJennyHappy: true
    },
    getters: {
        happyStaff: state => {
          return state.isLarryHappy && state.isJennyHappy
        }
      },
    mutations: {
        removeTv(state) {
            state.totalCount--
        }
    },
    actions: {
        removeTv(context) {
            if (context.state.totalCount >= amount) {
                context.commit('removeTv', amount)
            }
        }
    }
})