<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        async asyncData({ store }) {
            return await store.dispatch('GET_DATA', `{
                sections {
                    name
                    url
                    title
                    tags {
                        title
                    }
                }
            }`)
        },
        data: () => ({
            sectionActive: false,
            active: -1,
        }),
        computed: {
            ...mapState({
                sections: ({ data }) => data.sections
            })
        },
        methods: {
            ...mapActions([
                'setLoad'
            ]),
            goTo(section, index) {
                if(!this.sectionActive) {
                    this.sectionActive = true
                    this.active = index
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
        <div v-for="(section, index) in sections" :class="[ 'section--' + (index + 1), active === index ? 'section--active' : '' ]" :ref="section.name" @click="goTo(section, index)" class="section">
            <div class="section__wrapper">
                <div class="section__title"><div class="section__title-text">{{ section.title }}</div><div class="section__title-text">смотреть</div></div>
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

            #{$b}__title {
                &-text {
                    &:nth-child(1) {
                        display: none;
                    }
                    &:nth-child(2) {
                        display: block;
                    }
                }
            }
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
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
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
            -webkit-backface-visibility: hidden;
            -webkit-transform: translateZ(0) scale(1.0, 1.0);
            transform: translateZ(0);

            @include mb-down(sm) {
                padding: 16px;
            }
        }

        @keyframes show-label {
            0% {
                opacity: 0;
                transform: scale(0.95);
            }

            100% {
                opacity: 1;
                transform: scale(1);
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
            display: inline-flex;

            &-text {
                height: 27px;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                transform-origin: center center;
                animation: show-label .15s ease-out;

                &:nth-child(2) {
                    display: none;
                }
            }

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