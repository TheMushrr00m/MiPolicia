<template>
    <div class="soon">
        <b-icon class="soon-icon" icon="watch_later"></b-icon>
        <p>Próximamente...</p>
        <button class="button soon-button" v-on:click="soonClick">¡Quiero esta característica!</button>
    </div>
</template>

<script>
    export default {
        beforeCreate(){
            if (window.location.protocol === 'https:') {
                window.location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
            }
        },
        methods:{
            soonClick(){
                ga('send', 'event', 'Proximamente', 'click', 'Quiero');
                this.$snackbar.open({
                    duration: 5000,
                    message: 'Gracias por tu interés, le informaremos a la SSP que te gustaría tener esta característica en el sitio.',
                    type: 'is-info',
                    position: 'is-top'
                });
            }
        }
    }
</script>

<style lang="scss">
    .soon{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
    .soon-icon{
        margin-bottom: 0.5em;
    }
    .soon-button{
        background-color: #00243C;
        color:white !important;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
        border: none;
    }
    .soon-button:active:focus:visited{
        color:white !important;
    }
</style>