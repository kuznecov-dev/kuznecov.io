<script>
    import VLayout from './layout/Layout.vue'


    export default {
        components: {
            VLayout
        },
        data: () => ({

        }),
        mounted() {

        }
    }
</script>

<template>
    <div class="wrapper" id="app">
        <v-load></v-load>
        <v-layout>
            <transition>
                <router-view></router-view>
            </transition>
        </v-layout>
    </div>
</template>