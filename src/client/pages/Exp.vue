<script>
    import { mapState } from 'vuex'

    import Timeline from 'Components/Timeline.vue'

    export default {
        async asyncData({ store }) {
            return await store.dispatch('GET_DATA', `{
                timeline {
                    title
                    date
                    status
                    text
                }
                projects {
                    id
                    title
                    tag
                    url
                    text
                }
            }`)
        },
        components: {
            Timeline
        },
        data: () => ({

        }),
        computed: {
            ...mapState({
                timeline: ({ data }) => data.timeline,
                projects: ({ data }) => data.projects
            })
        }
    }
</script>

<template>
    <section class="v-page">
        <header class="v-page__header">
            <div class="v-page__title">Опыт</div>
            <router-link to="/" class="v-page__menu">
                <div class="mdi mdi-menu"></div>
            </router-link>
        </header>
        <section class="v-page__content typography">
            <div class="v-page__row">
                <div class="v-page__left">
                    <div class="v-page__sub-title v-page__sub-title--section">Где работал</div>
                    <timeline :items="timeline"></timeline>
                </div>
                <div class="v-page__right">
                    <div class="v-page__sub-title v-page__sub-title--section">Последние проекты</div>
                    <v-list>
                        <v-list-item v-for="project in projects" :key="project.id">
                            <v-preview v-bind="project"></v-preview>
                        </v-list-item>
                    </v-list>
                </div>
            </div>
            <div class="v-page__sub-title">Примеры кода</div>
            <div class="v-page__text">По понятным причинам, я не могу демонстрировать исходный код своих коммерческих проектов, специально для этого сделал этот сайт и запушил его на
                <a href="https://github.com/kuznecov-dev/kuznecov.io">GitHub</a>, он служит как портфолио и как пример моего кода и моей сборки</div>
            <div class="v-page__sub-title">Стек этого проекта</div>
            <div class="v-page__text">
                SCSS, ES6, Vue, Vuex, Vue-Router, NodeJS, Express, Vue SSR, GraphQL, Webpack
            </div>
            <div class="v-page__sub-title">Что умею</div>
            <div class="v-page__text">
                Более подробно о том, что я умею, вы можете прочитать на странице <router-link to="/skills">Навыки</router-link>
            </div>

            <v-menu></v-menu>
        </section>
    </section>
</template>
