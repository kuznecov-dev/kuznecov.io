<script>
    export default {
        data: () => ({

        })
    }
</script>

<template>
    <div class="v-list-item">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~Styles/vars";
    @import "~Styles/mixins";
    .v-list-item {
        flex-basis: 50%;
        max-width: 50%;
        padding: 0 $p-element / 2;
        margin-bottom: $m-element;

        @include mb-down(xs){
            flex-basis: 100%;
            max-width: 100%;
        }
    }
</style>