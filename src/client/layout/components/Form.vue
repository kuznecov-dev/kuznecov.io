<script>
    import Api from '../../api'
    import config from 'Root/config'
    import { validator } from '../../utils/validator'

    export default {
        props: {
            success: false,
            successMessage: '',
            validation: {
                type: Boolean,
                default: false
            },
            fields: {
                type: Array,
                default: []
            },
            button: {
                type: Object,
                default: {
                    title: 'Отправить'
                }
            }
        },
        data: () => ({
            items: []
        }),
        created() {
            if(this.fields.length) {
                this.fields.forEach(field => {
                    let item = field
                    if(item.value === undefined) {
                        if(item.type === 'text' || item.type === 'textarea') {
                            item.value = ''
                        } else if(item.type === 'checkbox' || item.type === 'radio') {
                            item.value = false
                        }
                    }

                    if(item.errors === undefined) {
                        item.errors = []
                    }

                    if(item.dirty === undefined) {
                        item.dirty = false
                    }

                    this.items.push(item)
                })
            }
        },
        mounted() {

        },
        methods: {
            submit(event) {
                event.preventDefault()

                if(this.validation) {
                    this.items.forEach((item, index) => {
                        item.dirty = true
                    })

                    if(this.check()) {
                        this.send()
                    }
                } else {
                    this.send()
                }
            },
            send() {
                Api.post(config.feedbackUrl, {
                    ...this.items
                }).then(response => {
                    let data = response.data
                    if(data.success) {
                        this.success = true
                        this.successMessage = data.message
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            check() {
                let valid = true
                this.items.forEach((item, index) => {
                    if(item.validation !== undefined && typeof item.validation === "object") {
                        let erros = validator(item.value, item.validation)
                        item.errors.splice(0, item.errors.length)
                        if(erros.length > 0) {
                            valid = false
                            item.errors.push(...erros)
                            this.$set(this.items, index, item)
                        }
                    }
                })

                return valid
            },
            change(item, value, index) {
                item.value = value
                item.dirty = true

                if(this.validation) {
                    this.check()
                }
            }
        }
    }
</script>

<template>
    <div class="v-form">
        <form class="v-form__wrapper" @submit="submit">
            <div v-if="!success" class="v-form__section">
                <div class="v-form__list">
                    <div v-for="(item, index) in items" class="v-form__item">
                        <div class="v-form__field">
                            <v-input v-if="item.type === 'text'" v-bind="item" @input="e => change(item, e.target.value)"></v-input>
                            <v-textarea v-if="item.type === 'textarea'" v-bind="item" @input="e => change(item, e.target.value)"></v-textarea>
                            <v-checkbox v-if="item.type === 'checkbox'" v-bind="item" @input="e => change(item, e.target.checked)"></v-checkbox>
                        </div>
                        <div v-if="item.errors.length && item.dirty" class="v-form__errors">
                            <div v-for="(error, index) in item.errors" :key="index" class="v-form__error">{{ error }}</div>
                        </div>
                    </div>
                </div>
                <div class="v-form__controls">
                    <v-button @click="submit()" v-bind="button"></v-button>
                </div>
            </div>
            <div v-else class="v-form__section">
                <div class="v-form__success">
                    <div class="v-form__success-title">Сообщение не отправлено!</div>
                    <div class="v-form__success-text">{{ successMessage }}</div>
                </div>
            </div>
        </form>
    </div>
</template>

<style lang="scss">
    @import "~Styles/vars";
    @import "~Styles/mixins";

    .v-form {
        background-color: $bg-block;
        padding: 24px;
        border-radius: 4px;
        &__item {
            margin-bottom: 24px;
        }

        @keyframes show-error {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }


        &__success {
            animation: show-error .15s ease-out;
            &-title {
                font-size: 24px;
                color: $action;
                text-align: center;
                margin-bottom: 24px;
                font-weight: 700;
            }
            &-text {
                text-align: center;
            }
        }

        &__error {
            font-size: 12px;
            font-weight: 700;
            color: $action;
            margin-top: 8px;
            animation: show-error .15s ease-out;
        }

        &__controls {
            padding-top: 16px;
            display: flex;
            justify-content: flex-end;
        }
    }
</style>