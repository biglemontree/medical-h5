import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const listChoose = window.android.getEhrList()
let result = JSON.parse(listChoose)
console.log('vuex result: ' , result)
const store = new Vuex.Store({
    state: {
        ehrId: result[0].EHRID,
        IN_DATE: result[0].IN_DATE,
        OUT_DATE: result[0].OUT_DATE,
    },
    mutations: {
        setEhrId (state, ehrId) {
          state.ehrId = ehrId
        },
        setInDate(state, IN_DATE){
            state.IN_DATE = IN_DATE
        },
        setInDate(state, OUT_DATE){
            state.OUT_DATE = OUT_DATE
        },
    }
})

export default store