<script>
    import { mapState } from 'vuex'

    import Skills from 'Components/Skills.vue'

    export default {
        async asyncData({ store }) {
            return await store.dispatch('GET_DATA', `{
                skills {
                    title
                    hash
                    progress
                    text
                }
            }`)
        },
        components: {
            Skills
        },
        data: () => ({

        }),
        computed: {
            ...mapState({
                skills: ({ data }) => data.skills
            })
        }
    }
</script>

<template>
    <section class="v-page">
        <header class="v-page__header">
            <div class="v-page__title">Навыки</div>
            <router-link to="/" class="v-page__menu">
                <div class="mdi mdi-menu"></div>
            </router-link>
        </header>
        <section class="v-page__content typography">
            <div class="v-page__sub-title">Список навыков</div>
            <div class="v-page__text">Ниже представлен список всех технологий, которые я использую и изучаю. <br> При клике на одну из них, вас переведет к полному описанию</div>
            <v-tags :items="skills"></v-tags>
            <skills :items="skills"></skills>
            <v-menu></v-menu>
        </section>
    </section>
</template>
