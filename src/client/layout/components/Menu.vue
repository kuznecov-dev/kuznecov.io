<script>
    export default {
        data: () => ({
            items: [
                {
                    title: 'Обо мне',
                    url: '/about'
                },
                {
                    title: 'Опыт работы',
                    url: '/exp'
                },
                {
                    title: 'Навыки',
                    url: '/skills'
                },
                {
                    title: 'Контакты',
                    url: '/contacts'
                },
                {
                    title: 'GitHub проекта',
                    url: 'https://github.com/kuznecov-dev/kuznecov.io',
                    outside: true
                }
            ]
        })
    }
</script>

<template>
    <div class="v-menu">
        <div v-for="item in items" class="v-menu__item">
            <a v-if="item.outside" :href="item.url" target="_blank" class="v-menu__link">{{ item.title }}</a>
            <router-link v-else :to="item.url" active-class="v-menu__link--active" class="v-menu__link">{{ item.title }}</router-link>
        </div>
    </div>
</template>

<style lang="scss">
    @import "~Styles/vars";
    @import "~Styles/mixins";

    .v-menu {
        margin-top: 48px;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 32px;

        @include mb-down(sm) {
            margin-top: 32px;
        }

        &__item {
            @include mb-down(sm) {
                flex-basis: 100%;
                max-width: 100%;
            }
        }

        &__link {
            border-radius: 4px;
            margin-bottom: 16px;
            margin-right: 16px;
            padding: 16px 32px;
            color: $text;
            font-weight: 600;
            text-decoration: none;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #202940;
            user-select: none;
            transition: $transition;
            &--active {
                display: none;
            }
            &:hover {
                color: #fff;
                background-color: $action;
            }

            &:active {
                color: #fff;
                background-color: $action-hover;
            }

            @include mb-down(sm) {

            }

            @include mb-down(xs) {
                margin-right: 0;
                width: 100%;
            }
        }
    }
</style>