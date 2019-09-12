import * as types from '../mutation-types'

const state = {
    load: false,
    scrollBar: undefined
}

const actions = {
    setScrollBar({ commit }, data) {
        commit(types.SET_SCROLLBAR, data);
    },
    setLoad({ commit }, data) {
        commit(types.SET_LOAD, data);
    }
}

const mutations = {
    [types.SET_LOAD]: (state, data) => {
        state.load = data
    },
    [types.SET_SCROLLBAR]: (state, data) => {
        state.scrollBar = data.element
    }
}

export default {
    state,
    actions,
    mutations
}