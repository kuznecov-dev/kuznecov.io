<script>
    export default {
        data: () => ({

        })
    }
</script>

<template>
    <section class="v-page">
        <header class="v-page__header">
            <div class="v-page__title">Контакты</div>
            <router-link to="/" class="v-page__menu">
                <div class="mdi mdi-menu"></div>
            </router-link>
        </header>
        <section class="v-page__content typography">
            <div class="v-page__sub-title">Email <span><i class="mdi mdi-star"></i> Предпочтительно</span></div>
            <div class="v-page__text"><a class="contact" href="mailto:paul.smith.developer@gmail.com">paul.smith.developer@gmail.com</a></div>
            <div class="v-page__sub-title">Телефон</div>
            <div class="v-page__text"><a class="contact" href="tel:+79951310777">+7 (995) 131 - 0777</a></div>
            <div class="v-page__sub-title">Telegram</div>
            <div class="v-page__text"><a class="contact" href="http://t.me/devsmith">@devsmith</a></div>
            <div class="v-page__sub-title">VK</div>
            <div class="v-page__text"><a class="contact" href="https://vk.com/paul_smiths">Павел Кузнецов</a></div>
            <v-menu></v-menu>
        </section>
    </section>
</template>
