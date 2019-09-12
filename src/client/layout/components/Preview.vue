<script>
    export default {
        props: {
            title: {
                type: String
            },
            url: {
                type: String
            },
            text: {
                type: String
            },
            tag: {
                type: String
            }
        },
        data: () => ({

        })
    }
</script>

<template>
    <div class="v-preview">
        <a :href="url" target="_blank" class="v-preview__wrapper">
            <div class="v-preview__title">{{ title }}</div>
            <div class="v-preview__text">{{ text }}</div>
            <div class="v-preview__tag">{{ tag }}</div>
        </a>
    </div>
</template>

<style lang="scss">
    @import "~Styles/vars";

    .v-preview {
        $b: '.v-preview';
        cursor: pointer;


        &__wrapper {
            display: block;
            padding: $p-element;
            background-color: $bg-block;
            border-radius: 4px;
            text-decoration: none;
            color: #fff;
            overflow: hidden;
            height: 160px;
            position: relative;
            transition: $transition;



            &:hover {
                background-color: $action;
                #{$b}__title, #{$b}__text {
                    color: #fff;
                }

                #{$b}__tag {
                    background-color: $action-hover;
                    color: #fff;
                }
            }

            &:active {
                background-color: $action-hover;
                #{$b}__title, #{$b}__text {
                    color: #fff;
                }

                #{$b}__tag {
                    background-color: $action-focus;
                    color: #fff;
                }
            }
        }

        &__image {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-position: center center;
            background-size: cover;
            background-blend-mode: multiply;
            border-radius: 4px;
            display: none;
        }

        &__title {
            position: absolute;
            top: 16px;
            left: 16px;
            right: 16px;
            color: $text;
            font-size: 16px;
            z-index: 3;
            font-weight: 600;
            letter-spacing: 1px;
            transition: $transition;
        }

        &__text {
            position: absolute;
            left: 16px;
            right: 16px;
            z-index: 3;
            color: $text;
            top: 40px;
            line-height: 1.6;
            transition: $transition;
        }
        
        &__tag {
            background-color: $bg-page;
            position: absolute;
            bottom: 8px;
            right: 8px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 3;
            font-weight: 600;
            color: $bg-element;
            padding: 4px 8px;
            transition: $transition;
        }

    }
</style>