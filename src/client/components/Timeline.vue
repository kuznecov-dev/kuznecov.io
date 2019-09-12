<script>
    export default {
        props: {
            items: {
                type: Array
            }
        },
        data: () => ({

        })
    }
</script>

<template>
    <div class="timeline">
        <div v-for="item in items" class="timeline__item">
            <div class="timeline__date">{{ item.date }}</div>
            <div class="timeline__title">{{ item.title }}</div>
            <div class="timeline__status">{{ item.status }}</div>
            <div class="timeline__text">{{ item.text }}</div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "~Styles/vars";

    .timeline {
        display: flex;
        flex-direction: column;
        border-left: 2px solid $action;
        position: relative;
        margin-left: 3px;


        &:after {
            content: '';
            position: absolute;
            top: -10px;
            left: -7px;
            border: 6px solid rgba($action, 0);
            border-bottom: 14px solid rgba($action, 1);
        }

        &:before {
            content: '';
            position: absolute;
            bottom: -2px;
            left: -7px;
            width: 12px;
            height: 12px;
            background-color: $action;
            border-radius: 50%;
        }

        &__item {
            padding: 24px 24px 8px 24px;
        }

        &__date {
            letter-spacing: 2px;
            font-size: 14px;
            text-transform: uppercase;
            color: $action;
            font-weight: 700;
            margin-bottom: 24px;

            position: relative;
            display: inline-block;
            &:before {
                content: '';
                position: absolute;
                bottom: -8px;
                left: -24px;
                height: 2px;
                width: calc(100% + 24px);
                background-color: $action;
            }
        }

        &__title {
            font-size: 18px;
            color: $text;
            margin-bottom: 8px;
            font-weight: 700;
        }

        &__status {
            font-size: 14px;
            color: $text;
            margin-bottom: 16px;
        }

        &__text {
            font-size: 12px;
            color: $text;
            line-height: 1.6;
        }
    }
</style>