<script>
    export default {
        props: {
            items: {
                type: Array
            }
        },
        data: () => ({
            progress: ['Low', 'Medium', 'High', 'Expert']
        })
    }
</script>

<template>
    <div class="skills">
        <div class="skills__list">
            <div v-for="(item, index) in items" class="skills__item" :id="item.hash ? item.hash : 'test-' + index">
                <router-link :to="'#' + item.hash" target="_blank" class="skills__title">{{ item.title }}</router-link>
                <div v-if="item.progress" class="skills__progress">
                    <div v-for="(level, index) in progress" :class="[ index + 1 <= item.progress ? 'skills__section--full': '', index + 1 === item.progress ? 'skills__section--active': '' ]" class="skills__section">
                        <div class="skills__section-wrapper">
                            <div class="skills__section-title">{{ level }}</div>
                        </div>
                    </div>
                </div>
                <div class="skills__text" v-html="item.text"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "~Styles/vars";
    @import "~Styles/mixins";

    .skills {
        &__list {

        }

        &__item {
            padding: 24px 0;
        }

        &__title {
            display: block;
            color: $text;
            text-decoration: none;
            font-weight:600;
            font-size: 20px;
            margin-bottom: 32px;
            &:before {
                content: '#';
                display: inline;
            }
        }

        &__text {
            color: $text;
            line-height: 1.6;
            font-size: 16px;
            margin-bottom: 24px;

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
        }

        &__progress {
            display: flex;
            margin-left: -4px;
            margin-right: -4px;
            max-width: 50%;
            margin-bottom: 24px;

            @include mb-down(sm) {
                max-width: 100%;
            }
        }

        &__section {
            position: relative;
            height: 6px;
            flex-basis: 25%;
            max-width: 25%;
            padding: 0 4px;
        }

        &__section-wrapper {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            background-color: $bg-block;
        }

        &__section--full &__section-wrapper {
            background-color: $action;
        }

        &__section-title {
            position: absolute;
            top: 0;
            left: 50%;
            font-weight: 700;
            color: $action;
            border-radius: 4px;
            align-items: center;
            padding-bottom: 8px;
            transform: translate(-50%, -100%);
            display: none;
        }

        &__section--active &__section-title {
            display: flex;
        }
    }
</style>