<script>
    export default {
        data: () => ({
            feedback: {
                action: '/feedback',
                validation: true,
                fields: [
                    {
                        label: 'Имя',
                        name: 'name',
                        type: 'text',
                        validation: {
                            required: true
                        }
                    },
                    {
                        label: 'E-mail',
                        name: 'email',
                        type: 'text',
                        validation: {
                            type: 'email'
                        }
                    },
                    {
                        label: 'Месседж',
                        name: 'text',
                        type: 'textarea',
                        validation: {
                            required: true
                        }
                    },
                    {
                        label: 'Я согласен на обработку моих данных',
                        name: 'accept',
                        type: 'checkbox',
                        value: false,
                        validation: {
                            required: true
                        }
                    }
                ],
                button: {
                    label: 'Написать',
                    icon: 'telegram'
                }
            }
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
            <div class="v-page__row">
                <div class="v-page__left">
                    <div class="v-page__sub-title">Напишите мне</div>
                    <div class="v-page__form">
                        <v-form v-bind="feedback"></v-form>
                    </div>
                </div>
                <div class="v-page__right">
                    <div class="v-page__contacts">
                        <div class="v-page__sub-title">Email <span><i class="mdi mdi-star"></i> Предпочтительно</span></div>
                        <div class="v-page__text"><a class="contact" href="mailto:paul.smith.developer@gmail.com">paul.smith.developer@gmail.com</a></div>
                        <div class="v-page__sub-title">Телефон</div>
                        <div class="v-page__text"><a class="contact" href="tel:+79951310777">+7 (995) 131 - 0777</a></div>
                        <div class="v-page__sub-title">Telegram</div>
                        <div class="v-page__text"><a class="contact" href="http://t.me/devsmith">@devsmith</a></div>
                        <div class="v-page__sub-title">VK</div>
                        <div class="v-page__text"><a class="contact" href="https://vk.com/paul_smiths">Павел Кузнецов</a></div>
                    </div>
                </div>
            </div>

            <v-menu></v-menu>
        </section>
    </section>
</template>
