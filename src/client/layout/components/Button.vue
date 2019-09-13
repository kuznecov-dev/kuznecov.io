<script>
    export default {
        props: {
            label: {
                type: String
            },
            icon: {
                type: String,
                default: ''
            }
        },
        data: () => ({

        }),
        mounted() {

        }
    }
</script>

<template>
    <button class="v-button">
        <span class="v-button__label">{{ label }}</span>
        <i v-if="icon" :class="[ 'mdi-'+icon ]" class="v-button__icon mdi"></i>
    </button>
</template>

<style lang="scss">
    @import "~Styles/vars";
    @import "~Styles/mixins";


    .v-button {
        outline: none;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        padding: 8px 32px;
        height: 48px;
        border: none;
        color: $text;
        border-radius: 4px;
        background-color: $bg-element;
        transition: $transition;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 1px;
        font-size: 12px;
        &:hover {
            color: #fff;
            background-color: $action;
        }

        &:active {
            color: #fff;
            background-color: $action-focus;
        }

        &__icon {
            margin-left: 8px;
            font-size: 24px;
        }
    }
</style>