import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        // increment(state, payload) {
        //     return state.count = state.count + payload.amount;
        // },
        // decrement(state, payload) {
        //     return state.count = state.count - payload.amount;
        // }
            INCREMENT (state) {
              state.count += 20;
            },
            DECREMENT (state) {
                state.count -= 20;
              }

    },
    // action: {
    //     increment(context, payload) {
    //         context.commit('increment', payload)
    //     },
    //     decrement(context, payload) {
    //         context.commit('decrement', payload)
    //     }
    // }
})
export default store;