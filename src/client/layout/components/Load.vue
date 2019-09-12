<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        data: () => ({
            delay: null,
            element: null
        }),
        computed: {
            ...mapState({
                load: ({page}) => page.load
            })
        },
        mounted() {
            this.element = document.getElementById('pre-loader')
        },
        methods: {
            ...mapActions([
                'setLoad'
            ]),
            show() {
                const element = this.$refs.loader

                this.$nextTick(() => {
                    element.style.opacity = '0'
                    element.style.display = 'flex'

                    setTimeout(() => {
                        element.style.opacity = '1'
                    }, 30)
                })

                this.delay = + new Date()
            },
            hide() {
                const element = this.$refs.loader

                this.$nextTick(() => {
                    element.style.opacity = '1'
                    element.style.display = 'flex'

                    setTimeout(() => {
                        element.style.opacity = '0'
                        setTimeout(() => {
                            element.style.display = 'none'
                        }, 150)
                    }, 30)
                })
            }
        },
        watch: {
            load(status) {
                if(status) {
                    this.show()
                } else {
                    let newTime = + new Date(),
                        range = newTime - this.delay

                    if(range < 770) {
                        setTimeout(() => {
                            this.hide()
                        }, 770)
                    } else {
                        this.hide()
                    }
                }
            }
        }
    }
</script>

<template>
    <div ref="loader" id="pre-loader" class="pre-loader">
        <div class="pre-loader__title">
            <i>З</i><i>а</i><i>г</i><i>р</i><i>у</i><i>з</i><i>к</i><i>а</i><i>.</i><i>.</i><i>.</i>
        </div>
        <div class="pre-loader__logo">Kuznecov.io</div>
    </div>
</template>

<style lang="scss">
    @import '~Styles/vars';
    @import '~Styles/mixins';

    .pre-loader {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #e83953;
        z-index: 99;
        align-items: center;
        justify-content: center;
        font-size: 48px;
        backface-visibility: hidden;
        display: none;
        font-weight: 200;
        transition: $transition;
    }

    @keyframes pre-loader-hide {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .pre-loader--end {
        animation: pre-loader-hide 1s ease-out forwards;
        animation-delay: 1s;
    }

    .pre-loader--end .pre-loader__title {
        opacity: 0;
    }

    .pre-loader__logo {
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 800;
        font-size: 5vw;
        color: #ea314c;
        text-transform: uppercase;

        @include mb-down(sm) {
            font-size: 10vw;
        }
    }

    .pre-loader__title {
        color: #fff;
        transition: opacity .15s ease-out;
    }

    @keyframes pre-loader-letter {
        0% {
            transform: translateY(0%);
        }
        50% {
            transform: translateY(-30%);
        }
        100% {
            transform: translateY(0%);
        }
    }

    .pre-loader__title i {
        display: inline-block;
        font-style: normal;
        animation: pre-loader-letter 1.5s ease-in-out infinite;
    }

    @for $i from 1 through 11 {
        .pre-loader__title i:nth-child(#{$i}) {
            animation-delay: #{$i * 70}ms;
        }
    }

    .pre-loader--end .pre-loader__check {
        display: block;
    }

    .pre-loader__check {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -45%);
        width: 320px;
        height: 320px;
        display: none;
    }

    .pre-loader__line {
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 4px;
    }

    .pre-loader__line:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 0%;
        height: 4px;
        background-color: #fff;
        border-radius: 4px;
    }

    @keyframes pre-loader-line-1 {
        0% {
            width: 0%;
        }
        100% {
            width: 100%;
        }
    }

    @keyframes pre-loader-line-2 {
        0% {
            width: 0%;
        }
        100% {
            width: 100%;
        }
    }

    .pre-loader__line--1 {
        left: 50%;
        top: 50%;
        margin-left: 2px;
        transform-origin: left;
        transform: rotate(225deg);
        animation-delay: .15s;
    }

    .pre-loader__line--1:before {
        animation: pre-loader-line-1 .3s ease-in forwards;
    }

    .pre-loader__line--2:before {
        right: auto;
        left: 0;
        animation: pre-loader-line-2 .4s ease-out forwards;
        animation-delay: .3s;
    }

    .pre-loader__line--2 {
        left: 50%;
        top: 50%;
        width: 100px;
        transform-origin: left;
        transform: rotate(315deg);
    }
</style>