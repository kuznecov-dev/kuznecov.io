<script>
    export default {
        props: {
            value: {
                type: String
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
    <div class="v-textarea">
        <textarea ref="el" class="v-textarea__el" :placeholder="label" @input="$emit('input', $event)"></textarea>
    </div>
</template>

<style lang="scss">
    @import "~Styles/vars";
    @import "~Styles/mixins";

    .v-textarea {
        &__el {
            width: 100%;
            box-shadow: none;
            border: none;
            outline: none;
            color: $text;
            height: 96px;
            resize: none;
            background-color: $bg-page;
            padding: 16px;
            border-radius: 4px;
        }
    }
</style>