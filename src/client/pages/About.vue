<script>
    export default {
        data: () => ({

        })
    }
</script>

<template>
    <section class="v-page">
        <header class="v-page__header">
            <div class="v-page__title">Обо мне</div>
            <router-link to="/" class="v-page__menu">
                <div class="mdi mdi-menu"></div>
            </router-link>
        </header>
        <section class="v-page__content typography">
            <div class="v-page__sub-title">Как зовут?</div>
            <div class="v-page__text">Меня зовут Павел Кузецов, мне 23 года и я проживаю в Самаре</div>
            <div class="v-page__sub-title">Чем занимаешься?</div>
            <div class="v-page__text">
                Занимаюсь web-разработкой 4 года, это было моим любимым хобби, а потом стало работой.
                <br>
                Начал свою программистскую деятельность с разработки карт для WarCraft 3, потом делал моды для SAMP, а позже пошел учиться на системного программиста, где освоил C++/C# и получил базовые знания
            </div>

            <div class="v-page__sub-title">Как пришел в WEB?</div>
            <div class="v-page__text">
            Захотел создать свой сайт, начал изучать html/css/js по гайдам из гугла и вскоре сверстал пару сайтов, мне нравилось то, что я делал, поэтому продолжил изучать это направление и до сих пор его изучаю, каждый день
            </div>

            <div class="v-page__sub-title">Увлечения</div>
            <div class="v-page__text">В свободное время я делаю свои наработки/проекты или продолжаю обучаться, но когда на душе тоска, я запускаю дотку и зову друзей</div>
            <v-menu></v-menu>
        </section>
    </section>
</template>
