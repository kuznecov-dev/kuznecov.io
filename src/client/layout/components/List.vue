<script>
    export default {
        data: () => ({

        })
    }
</script>

<template>
    <div class="v-list">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~Styles/vars";

    .v-list {
        display: flex;
        flex-wrap: wrap;
        margin-left: -$p-element / 2;
        margin-right: -$p-element / 2;
    }
</style>