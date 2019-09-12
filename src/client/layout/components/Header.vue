<script>
    export default {
        data: () => ({
            menu: [
                {
                    title: 'Обо мне',
                    url: '/about'
                },
                {
                    title: 'Чем занимался',
                    url: 'experience'
                },
                {
                    title: 'Навыки',
                    url: 'skills'
                },
                {
                    title: 'Контакты',
                    url: 'contacts'
                }
            ]
        })
    }
</script>

<template>
    <header class="v-header">
        <div class="v-header__container">
            <div class="v-header__menu">
                <v-menu :items="menu"></v-menu>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
    @import "~Styles/vars";

    .v-header {
        height: 70px;
        background-color: #283556;
        display: flex;
        display: none;

        align-items: center;
        justify-content: center;
        &__menu {

        }
    }
</style>