<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        data: () => ({
            sectionActive: false,
            sections: [
                {
                    name: 'about',
                    active: false,
                    url: 'about',
                    title: 'Обо мне',
                    tags: [
                        {
                            title: 'Павел'
                        },
                        {
                            title: '23 года'
                        },
                        {
                            title: 'ЗОЖ'
                        },
                        {
                            title: 'Астрономия'
                        },
                        {
                            title: 'Котэ'
                        },
                        {
                            title: 'Metalcore'
                        },
                        {
                            title: 'RYTP'
                        },
                        {
                            title: 'Habr'
                        },
                        {
                            title: 'Gamedev'
                        },
                        {
                            title: 'Манга'
                        },
                        {
                            title: 'Бизнес'
                        },
                        {
                            title: 'Политика'
                        },
                        {
                            title: 'DOTA 2'
                        }
                    ]
                },
                {
                    name: 'exp',
                    active: false,
                    url: 'exp',
                    title: 'Опыт',
                    tags: [
                        {
                            title: 'Кувалда.ру'
                        },
                        {
                            title: 'СПБ Дом Книги'
                        },
                        {
                            title: 'SNS'
                        },
                        {
                            title: 'Miele Shop'
                        },
                        {
                            title: 'DM Shop'
                        },
                        {
                            title: 'VIRBAC'
                        },
                        {
                            title: 'Generation S'
                        },
                        {
                            title: 'Ostec'
                        },
                        {
                            title: 'Berito'
                        },
                        {
                            title: 'WolfsBrewery'
                        },
                        {
                            title: 'Medici-Jewelry'
                        },
                        {
                            title: 'VivatBayan'
                        },
                        {
                            title: 'Flebofa'
                        },
                        {
                            title: 'Charm-Optika'
                        },
                        {
                            title: 'СВПЗ'
                        },
                        {
                            title: 'Team8'
                        },
                    ]
                },
                {
                    name: 'contacts',
                    active: false,
                    url: 'contacts',
                    title: 'Контакты',
                    tags: [
                        {
                            title: 'Самара'
                        },
                        {
                            title: 'Telegram'
                        },
                        {
                            title: 'Телефон'
                        },
                        {
                            title: 'Email'
                        },
                        {
                            title: 'VK'
                        }
                    ]
                },
                {
                    name: 'skills',
                    active: false,
                    url: 'skills',
                    title: 'Навыки',
                    tags: [
                        {
                            title: 'HTML'
                        },
                        {
                            title: 'CSS'
                        },
                        {
                            title: 'SCSS'
                        },
                        {
                            title: 'Bootstrap'
                        },
                        {
                            title: 'PUG'
                        },
                        {
                            title: 'ES6'
                        },
                        {
                            title: 'JS'
                        },
                        {
                            title: 'Vue'
                        },
                        {
                            title: 'Vuex'
                        },
                        {
                            title: 'JQuery'
                        },
                        {
                            title: 'Node.js'
                        },
                        {
                            title: 'Express'
                        },
                        {
                            title: 'Angular'
                        },
                        {
                            title: 'TS'
                        },
                        {
                            title: 'Photoshop'
                        },
                        {
                            title: 'Zeplin.io'
                        },
                        {
                            title: 'InVision'
                        },
                        {
                            title: 'Axios'
                        },

                        {
                            title: 'Three.js'
                        },
                        {
                            title: 'Git'
                        },
                    ]
                }
            ],
        }),
        mounted() {

        },
        methods: {
            ...mapActions([
                'setLoad'
            ]),
            goTo(section) {
                if(!this.sectionActive) {
                    this.sectionActive = true
                    section.active = true
                    const element = this.$refs[section.name][0]

                    setTimeout(() => {
                        let translateX = '',
                            translateY = '',
                            url = section.url

                        if(section.name === 'about') {
                            translateX = '-100%'
                            translateY = '-100%'
                        }

                        if(section.name === 'exp') {
                            translateX = '0%'
                            translateY = '-100%'
                        }

                        if(section.name === 'contacts') {
                            translateX = '0%'
                            translateY = '0%'
                        }

                        if(section.name === 'skills') {
                            translateX = '-100%'
                            translateY = '0%'
                        }

                        this.animation(element, translateX, translateY, () => {
                            this.setLoad(true)
                            setTimeout(() => {
                                this.$router.push(url)
                            }, 150)
                        })
                    }, 300)
                }
            },
            animation(element, translateX, translateY, callback) {
                Velocity(element, {
                    width: '140vh',
                    height: '140vh',
                    rotateZ: '45deg',
                    translateX: translateX,
                    translateY: translateY,
                }, 0)
                Velocity(element, {
                    width: '20vw',
                    height: '20vw',
                    rotateZ: '45deg',
                    translateX: '-50%',
                    translateY: '-50%',
                }, 300, () => {
                    setTimeout(() => {
                        Velocity(element, {
                            rotateZ: '0deg',
                            translateX: '-50%',
                            translateY: '-50%',
                        }, 150, () => {
                            setTimeout(() => {
                                Velocity(element, {
                                    width: '100vw',
                                    height: '100vh',
                                }, 150, () => {
                                    setTimeout(() => {
                                        callback()
                                    }, 150)
                                })
                            }, 300)
                        })
                    }, 300)
                })
            }
        }
    }
</script>

<template>
    <div class="sections" :class="sectionActive ? 'sections--active': ''">
        <div v-for="(section, index) in sections" :class="[ 'section--' + (index + 1), section.active ? 'section--active' : '' ]" :ref="section.name" @click="goTo(section)" class="section">
            <div class="section__wrapper">
                <div class="section__title">{{ section.title }}</div>
            </div>
            <div class="section__tags">
                <div v-for="(tag, index) in section.tags" class="section__tag">{{ tag.title }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "~Styles/vars";
    @import "~Styles/mixins";

    .sections {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }

    .sections--active .section {
        opacity: 0;

        &--active {
            opacity: 1;
        }
    }

    .section {
        $b: '.section';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 140vh;
        height: 140vh;
        transform-origin: left top;
        transform: rotate(45deg) translate(-50%, -50%);
        background-color: #1a1f2e;
        border: 1px solid #202940;
        cursor: pointer;

        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;

        &:hover {


            .space {
                opacity: 0!important;
            }
        }

        &__tags {
            position: absolute;
            top: 0%;
            left: 0%;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            flex-direction: column-reverse;
            pointer-events: none;
            opacity: 1;
            z-index: 3;
            transition: opacity .15s ease-out;
        }

        &__tag {
            color: #fff;
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 700;
            margin-top: 32px;
            transition: $transition;
            opacity: 0;

            @include mb-down(lg) {

            }

            @include mb-down(sm) {
                margin-top: 24px;
                font-size: 10px;
            }
        }

        &:hover {
            #{$b}__wrapper {
                background-color: $action;
            }
            #{$b}__title {
                color: #fff;
            }
        }

        &__wrapper {
            padding: 32px;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            transition: background-color .15s ease-out;

            @include mb-down(sm) {
                padding: 16px;
            }
        }
        
        &__title {
            font-size: 24px;
            color: $text;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 2px;
            transition: $transition;
            position: relative;
            z-index: 3;

            @include mb-down(sm) {
                font-size: 16px;
            }
        }

        &--active {

            #{$b}__wrapper {
                background-color: $action;
                transform: rotate(0deg) !important;
            }

            #{$b}__tags {
                opacity: 0;
            }

            #{$b}__title {
                opacity: 0;
            }
        }

        &--1 {
            transform: rotate(45deg) translate(-100%, -100%);

            #{$b}__image {
                transform: rotate(-45deg) translateY(5%);
                background-position: bottom center;
                background-size: 30%;

            }
            #{$b}__tags {
                padding-bottom: 88px;
                padding-right: 32px;

                @include mb-down(sm) {
                    padding-bottom: 56px;
                    padding-right: 16px;
                }
            }
            #{$b}__wrapper {
                transform: rotate(-180deg);
            }

            #{$b}__title {
                display: inline-block;
                transform-origin: left top;
                transform: translateX(100%) translateY(100%) rotate(180deg);
            }

            &:hover {
                .section__tag {
                    opacity: 1;
                    transform: translateX(0%);

                    @for $i from 1 through 30 {
                        &:nth-child(#{$i}) {
                            transition-delay: #{30 * $i}ms;
                        }
                    }
                }
            }

            #{$b}__tag {
                transform: translateX(-100%);
            }
        }

        &--2 {

            transform: rotate(45deg) translate(0%, -100%);

            #{$b}__wrapper {
                transform: rotate(-90deg);
            }

            &:hover {
                .section__tag {
                    opacity: 1;
                    transform: translateX(0%);

                    @for $i from 1 through 30 {
                        &:nth-child(#{$i}) {
                            transition-delay: #{30 * $i}ms;
                        }
                    }
                }
            }

            #{$b}__tags {
                transform: rotate(-90deg);
                justify-content: flex-start;
                align-items: flex-start;
                flex-direction: column;
                padding-top: 88px;
                padding-left: 32px;

                @include mb-down(sm) {
                    padding-top: 56px;
                    padding-left: 16px;
                }
            }

            #{$b}__tag {
                margin-top: 0;
                margin-bottom: 32px;
                transform: translateX(100%);

                @include mb-down(sm) {
                    margin-bottom: 24px;
                }
            }
        }

        &--3 {
            transform: rotate(45deg) translate(0%, 0%);
            &:hover {
                .section__tag {
                    opacity: 1;
                    transform: translateX(0%);
                    @for $i from 1 through 30 {
                        &:nth-child(#{$i}) {
                            transition-delay: #{30 * $i}ms;
                        }
                    }

                }
            }

            #{$b}__tags {
                transform: rotate(0deg);
                justify-content: flex-start;
                align-items: flex-start;
                flex-direction: column;
                padding-top: 88px;
                padding-left: 32px;

                @include mb-down(sm) {
                    padding-top: 56px;
                    padding-left: 16px;
                }
            }

            #{$b}__tag {
                margin-top: 0;
                margin-bottom: 32px;
                transform: translateX(100%);
                @include mb-down(sm) {
                    margin-bottom: 24px;
                }
            }
        }

        &--4 {
            transform: rotate(45deg) translate(-100%, 0%);
            #{$b}__wrapper {
                transform: rotate(90deg);
            }

            #{$b}__title {
                display: inline-block;
                transform: scaleY(-1) scaleX(-1);
            }


            &:hover {
                .section__tag {
                    opacity: 1;
                    transform: translateX(0%);

                    @for $i from 1 through 30 {
                        &:nth-child(#{$i}) {
                            transition-delay: #{30 * $i}ms;
                        }
                    }
                }
            }

            #{$b}__tags {
                transform: rotate(-90deg);
                justify-content: flex-start;
                align-items: flex-end;
                flex-direction: column-reverse;
                padding-bottom: 88px;
                padding-right: 32px;

                @include mb-down(sm) {
                    padding-bottom: 56px;
                    padding-right: 16px;
                }
            }

            #{$b}__tag {
                margin-top: 32px;
                transform: translateX(-100%);

                @include mb-down(sm) {
                    margin-top: 24px;
                }

            }
        }


    }

</style>