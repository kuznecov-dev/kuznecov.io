<script>
    export default {
        props: {
            value: {
                type: String,
                default: ''
            },
            label: {
                type: String
            }
        },
        data: () => ({

        }),
        mounted() {
            this.$refs.el.value = this.value
        }
    }
</script>

<template>
    <div class="v-input">
        <input ref="el" type="text" class="v-input__el" :placeholder="label" @input="$emit('input', $event)">
    </div>
</template>

<style lang="scss">
    @import "~Styles/vars";
    @import "~Styles/mixins";

    .v-input {
        &__el {
            border-radius: 4px;
            width: 100%;
            box-shadow: none;
            border: none;
            outline: none;
            color: $text;
            height: 40px;
            background-color: $bg-page;
            padding: 0 16px;
        }
    }
</style>