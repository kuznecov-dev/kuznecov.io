<script>
    import Vue from 'vue'
    import { mapActions } from 'vuex'
    import VueScroll from 'vuescroll'

    const NameLayout = 'V'
    const requireComponent = require.context(
        './components',
        false,
        /\.(vue|js)$/
    )

    requireComponent.keys().forEach(fileName => {
        const componentConfig = requireComponent(fileName)
        const componentName = NameLayout + fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
        Vue.component(
            componentName,
            componentConfig.default || componentConfig
        )
    })

    export default {
        name: 'v-layout',
        components: {
            VueScroll
        },
        data: () => ({
            scrollOptions: {
                scrollPanel: {
                    initialScrollX: false
                },
                bar: {
                    background: '#e83953',
                    keepShow: true
                }
            }
        }),
        mounted() {
            this.setScrollBar({
                element: this.$refs.scrollBar
            })
            this.$router.afterEach((to, from) => {
                this.$refs.scrollBar.scrollTo({
                    y: 0
                }, 0)
            })
        },
        methods: {
            ...mapActions([
                'setScrollBar'
            ])
        }
    }
</script>

<template>
    <div class="v-layout">
        <vue-scroll ref="scrollBar" :ops="scrollOptions">
            <div class="v-layout__container">
                <slot></slot>
            </div>
        </vue-scroll>
    </div>
</template>

<style lang="scss">
    @import "assets/styles/index";

    .v-layout {
        position: relative;
        height: 100vh;
        overflow: hidden;
        background-color: #1a1f2e;

        &__container {
            max-width: 1024px;
            width: 100%;
            margin: 0 auto;
            padding: 0 32px;
        }
    }

    .v-page {
        &__header {
            position: relative;
            height: 110px;
            display: flex;
            align-items: center;
            border-bottom: 2px solid $action;
            margin-bottom: 40px;

            @include mb-down(sm) {
                height: auto;
                padding: 24px 0;
            }
        }
        &__title {
            font-size: 48px;
            font-weight: 700;
            text-transform: uppercase;
            color: $action;



            @include mb-down(sm) {
                font-size: 32px;
            }
        }
        
        &__menu {
            margin-top: 1px;
            text-decoration: none;
            position: absolute;
            right: 32px;
            top: 100%;
            transform-origin: center top;
            transform: rotate(45deg) translateY(-50%);
            width: 48px;
            height: 48px;
            background-color: $action;
            transition: $transition;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            &:hover {
                background-color: $action-hover;
            }
            &:active {
                background-color: $action-focus;
            }
            .mdi {
                transform: rotate(-45deg);
            }
            @include mb-down(sm) {
                right: 24px;
            }
        }

        &__sub-title {
            color: $action;
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 8px;
            line-height: 1.4;

            &--section {
                margin-bottom: 24px;
            }

            span {
                color: $text;
                font-size: 12px;
                vertical-align: middle;
            }
        }

        &__text {
            font-size: 16px;
            color: $text;
            margin-bottom: 32px;
            line-height: 1.8;

            a {
                color: #fff;
                font-weight: 600;
                text-decoration: none;
                transition: $transition;
                &:hover {
                    color: $action;
                }
                &:active {
                    color: $action-hover;
                }
            }

            .contact {
                font-weight: 400;
                @include mb-down(sm) {
                    display: block;
                    margin-top: -8px;
                    font-size: 14px;
                }
            }
        }



        &__row {
            display: flex;
            margin-bottom: 32px;
            flex-wrap: wrap;


        }

        &__left {
            flex-basis: 40%;
            max-width: 40%;

            @media screen and (max-width: 880px) {
                margin-bottom: 24px;
                flex-basis: 100%;
                max-width: 100%;
            }
        }

        &__right {
            flex-basis: 60%;
            max-width: 60%;

            @media screen and (max-width: 880px) {
                flex-basis: 100%;
                max-width: 100%;
            }
        }
    }
</style>