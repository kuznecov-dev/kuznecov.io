<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        props: {
            items: {
                type: Array
            }
        },
        data: () => ({

        }),
        computed: {
            ...mapState({
                scrollBar: ({page}) => page.scrollBar
            })
        },
        methods: {
            goTo(hash) {
                this.scrollBar.scrollIntoView('#' + hash, 0)
            }
        }
    }
</script>

<template>
    <div class="v-tags">
        <div class="v-tags__list">
            <div v-for="item in items" class="v-tags__item" @click="goTo(item.hash)">
                <div class="v-tags__title">{{ item.title }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "~Styles/vars";
    @import "~Styles/mixins";

    .v-tags {
        margin-bottom: 24px;

        &__list {
            display: flex;
            flex-wrap: wrap;
        }

        &__item {
            text-decoration: none;
            margin-bottom: 8px;
            margin-right: 8px;
            border-radius: 4px;
            padding: 8px $p-element;
            cursor: pointer;
            font-weight: 600;
            color: $text;
            background-color: $bg-element;
            transition: $transition;
            &:hover {
                color: #fff;
                background-color: $action;
            }

            &:active {
                color: #fff;
                background-color: $action-hover;
            }

            @include mb-down(sm) {
                padding: 12px 16px;
                text-align: center;
                font-size: 12px;
            }

            @include mb-down(xs) {
                flex-basis: calc(50% - 8px);
            }
        }
    }
</style>