<script>
    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
            label: {
                type: String
            }
        },
        data: () => ({

        }),
        mounted() {
            this.$refs.el.checked = this.value
        }
    }
</script>

<template>
    <label class="v-checkbox">
        <input ref="el" type="checkbox" class="v-checkbox__el" @input="$emit('input', $event)">
        <span class="v-checkbox__label">{{ label }}</span>
    </label>
</template>

<style lang="scss">
    @import "~Styles/vars";
    @import "~Styles/mixins";

    .v-checkbox {
        display: block;

        &__el {
            display: none;
        }

        &__el:checked + &__label {
            color: #fff;
            &:before {
                background-color: $action;
            }
            &:after {
                transition-delay: .15s;
                opacity: 1;
                width: 15px;
            }
        }
        &:hover &__label {
            color: #fff;

        }
        &__label {
            user-select: none;
            cursor: pointer;
            position: relative;
            padding-left: 30px;
            line-height: 24px;
            color: $text;
            font-size: 14px;
            display: block;
            transition: $transition;

            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 1px;
                width: 20px;
                height: 20px;
                border-radius: 4px;
                box-sizing: border-box;
                transition: $transition;
                background-color: $bg-page;
            }
            &:after {
                position: absolute;
                left: 1px;
                top: -1px;
                color: #fff;
                line-height: 1;
                text-decoration: inherit;
                text-transform: none;
                transition: all .2s ease-out;
                opacity: 0;
                width: 0px;
                overflow: hidden;
                transform-origin: left center;
                content: "\F12C";
                display: inline-block;
                font: normal normal normal 24px/1 "Material Design Icons";
                text-rendering: auto;
                line-height: inherit;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                font-size: 16px;
            }
        }
    }
</style>