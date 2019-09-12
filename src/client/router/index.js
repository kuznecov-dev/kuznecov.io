import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../pages/Home.vue')
const About = () => import('../pages/About.vue')
const Exp = () => import('../pages/Exp.vue')
const Skills = () => import('../pages/Skills.vue')
const Contacts = () => import('../pages/Contacts.vue')

export function createRouter () {
    return new Router({
        mode: 'history',
        fallback: false,
        routes: [
            {
                path: '/',
                component: Home
            },
            {
                path: '/about',
                component: About
            },
            {
                path: '/exp',
                component: Exp
            },
            {
                path: '/skills',
                component: Skills
            },
            {
                path: '/contacts',
                component: Contacts
            },
        ]
    })
}
