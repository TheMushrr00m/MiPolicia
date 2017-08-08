<template>
    <div class="container">
        <div class="search-container">
            <p class="text-centered margin-bottom">Para buscar tu automóvil introduce tus placas:</p>
            <b-field position="is-centered">
                <b-input placeholder="Búsqueda..."
                    type="search"
                    icon="search"
                    v-model="plate"
                    :loading="isLoading">
                </b-input>
                <p class="control">
                    <button class="button is-info" v-on:click.keyup.enter="search" :disabled="isDisabled">Buscar</button>
                </p>
            </b-field>
        </div>
        <div class="response-container">
            <panel v-for="data in response"
                   :title="data.Codigo"
                   :address="data.direccion"
                   :phone="data.telefono"
                   :date="data.fecha_humano"
                   :rtime="data.hora_humano"
                   :deposit="data.nombre"
                   :plate="data.Placas"
                   :id="data.id"
                   :lat="data.latitud"
                   :lng="data.Longitud"
                   :key="data.id">
            </panel>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { DEPOSIT_URL } from './secrets'
    import Panel from './components/Panel.vue'

    export default {
        data(){
            return{
                plate: null,
                isLoading: false,
                isDisabled: false,
                response: null
            }
        },
        components:{
          panel: Panel
        },
        methods:{
            search(){
                this.isDisabled = true;
                this.isLoading = true;
                axios.get(DEPOSIT_URL + this.plate)
                .then(response => {
                    this.isLoading = false;
                    this.isDisabled = false;
                    if(response.data.length === 0){
                        this.$toast.open({
                        duration: 5000,
                        message: 'No encontramos información para la placa ' + this.plate.toUpperCase(),
                        type: 'is-info'})
                    } else {
                        this.response = response.data;
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.$toast.open({
                        duration: 5000,
                        message: 'Lo sientimos, la conexión con el servidor falló',
                        type: 'is-danger'
                    });
                    this.isLoading = false;
                    this.isDisabled = false;
                })
            }
        },
        beforeCreate(){
            if (window.location.protocol === 'https:') {
                window.location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
            }
        }
    }
</script>

<style>
    .content p:not(:last-child){
        margin: 0;
    }
    .container{
        margin: 2em auto;
    }
    .text-centered{
        text-align: center;
    }
    .margin-bottom{
        margin-bottom: 1em !important;
    }
    .search-container{
        margin-bottom: 3em;
    }
    .response-container{
        margin: 0 2em;
    }
    .subtitle{
        font-size: 1em;
        color: darkgrey;
    }
    .panel-heading{
        font-weight: bold;
        background-color: #00243C;
        color: white !important;
    }
    .panel-content{
        background-color: whitesmoke;
    }
    .panel-block{
        padding: 1em;
    }
</style>