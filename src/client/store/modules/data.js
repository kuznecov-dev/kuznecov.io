import Api from '../../api'
import * as types from '../mutation-types'
import config from 'Root/config'

const state = {
    skills: [],
    timeline: [],
    sections: [],
    projects: []
}

const actions = {
    GET_DATA: async ({ commit }, query) => {
        try {
            const response = await Api.post(config.entryPoint, {
                query
            })

            let data = response.data.data

            if(data.skills && data.skills.length) {
                commit(types.SET_SKILLS, data.skills);
            }

            if(data.timeline && data.timeline.length) {
                commit(types.SET_TIMELINE, data.timeline);
            }

            if(data.projects && data.projects.length) {
                commit(types.SET_PROJECTS, data.projects);
            }

            if(data.sections && data.sections.length) {
                commit(types.SET_SECTIONS, data.sections);
            }
        } catch (error) {
            console.log('error', error)
        }
    }
}

const mutations = {
    [types.SET_SKILLS]: (state, data) => {
        state.skills.splice(0, state.skills.length);
        state.skills.push(...data)
    },
    [types.SET_TIMELINE]: (state, data) => {
        state.timeline.splice(0, state.timeline.length);
        state.timeline.push(...data)
    },
    [types.SET_PROJECTS]: (state, data) => {
        state.projects.splice(0, state.projects.length);
        state.projects.push(...data)
    },
    [types.SET_SECTIONS]: (state, data) => {
        state.sections.splice(0, state.sections.length);
        state.sections.push(...data)
    },
}

export default {
    state,
    actions,
    mutations
}