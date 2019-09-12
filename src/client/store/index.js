import Vue from 'vue'
import Vuex from 'vuex'

import page from './modules/page'
import data from './modules/data'

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
        modules: {
            page,
            data,
        }
    })
}
