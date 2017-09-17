<template>
    <div id="app">
        <div class="header">
            <h1><sub class="title">▀</sub><sup class="title">▀</sup><span class="text-light bigger">&ensp;MI</span> <span class="text-bold bigger">POLICÍA&ensp;</span><sup class="title">▀</sup><sub class="title">▀</sub></h1>
            <i v-on:click="cardModal" class="clickable bigger material-icons">help_outline</i>
        </div>
        <div class="main-content">
            <div class="menu">
                <b-tabs size="is-small" type="is-toggle" expanded @change="tabIndex" v-model="activeTab">
                    <b-tab-item label="Cuadrantes" icon="map"></b-tab-item>
                    <b-tab-item label="Corralón" icon="directions_car"></b-tab-item>
                    <b-tab-item label="Denuncia" icon="visibility"></b-tab-item>
                </b-tabs>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data(){
            return{
                activeTab: 0,
            }
        },
        methods:{
            tabIndex(index){
                switch(index){
                    case 0:
                        try{
                          this.$ga.event({eventCategory: 'Pagina',
                                          eventAction: 'click',
                                          eventLabel: 'Cuadrante',
                                          eventValue: 1});
                        } catch (e) {
                            console.log(e);
                        }
                        this.$router.push({ name: 'home' });
                        break;
                    case 1:
                        try{
                          this.$ga.event({eventCategory: 'Pagina',
                                          eventAction: 'click',
                                          eventLabel: 'Corralon',
                                          eventValue: 1});
                        } catch (e) {
                            console.log(e);
                        }
                        this.$router.push({ name: 'deposit' });
                        break;
                    case 2:
                        try {
                          this.$ga.event({eventCategory: 'Pagina',
                                          eventAction: 'click',
                                          eventLabel: 'Denuncia',
                                          eventValue: 1});
                        } catch (e) {
                            console.log(e);
                        }
                        this.$router.push({ name: 'reporting' });
                        break;
                }
            },
            cardModal() {
                console.log('click');
                this.$modal.open({
                    width: 640,
                    content: `<div class="card">
                        <div class="card-content">
                            <div class="media-content">
                                <p class="title is-4">Mi Policía</p>
                                <p class="subtitle is-6">twitter: @tello_io</p>
                            </div>
                            <div class="content">
                                Esta es una aplicación de ciudadanos mexicanos que está pensada
                                para funcionar únicamente en la Ciudad de México.<br>
                                La aplicación web fue desarrollada con ayuda de la información
                                abierta de la Secretaría de Seguridad Pública de la Ciudad de México.<br>
                                Toda la información puede ser encontrada en <a href="http://datos.labcd.mx">Laboratorio de Datos</a>
                                como parte de la estrategia de gobierno abierto del <a href="http://labcd.mx">Laboratorio para la Ciudad</a>.<br>
                                Si tienes alguna pregunta relacionada a la información o las licencias de uso puedes enviar un correo
                                electrónico a laboratorio [-at-] labcd.mx
                                <br><br>
                                Cualquier marca relacionada al Gobierno de la Ciudad de México pertenece al Gobierno de la Ciudad de México.<br>
                                En su totalidad esta es una aplicación gratuita de licenciamiento abierto y sin ningún fin de lucro.<br>
                                La información recabada solo es utilizada para fines estadísticos y no será utilizada o compartida para ningún otro fin.
                                <br><br>
                                <small>18:30 PM - 13 Agosto 2017</small>
                            </div>
                        </div>
                    </div>`
                })
            },
            updateTab(index){
                this.activeTab = index;
            }
        },
        mounted(){
            let path = window.location.hash.split('/').pop();
            switch(path){
                case '':
                    this.updateTab(0);
                    break;
                case 'deposit':
                    this.updateTab(1);
                    break;
                case 'reporting':
                    this.updateTab(2);
                    break;
            }
        },
        beforeCreate(){
            if (this.$route.name === 'home' && window.location.protocol !== 'https:') {
                window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
            }
            else if(this.$route.name !== 'home' && window.location.protocol === 'https:'){
                window.location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
            }
        }
    }
</script>

<style lang="scss">
    @import '~buefy/lib/buefy.css';
    @import '~font-awesome/css/font-awesome.css';
    @import '~material-design-icons/iconfont/material-icons.css';
    @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);

    * {
        font-family: 'Roboto', sans-serif;
    }

    html, body, #app {
        height: 100%;
        width: 100%;
        margin: 0;
        background-color: #efefef;
    }
    .main-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .header {
        height: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #00243C;
        color: white;
        text-align: center;
        h1{
            margin: 0;
        }
        .title {
            color: white;
            font-size: 1em;
        }
        .text-light {
            font-weight: 300;
            vertical-align: text-bottom;
        }
        .text-bold {
            font-weight: 700;
            vertical-align: text-bottom;
        }
        .clickable {
            cursor: pointer;
        }
        .bigger{
            font-size: 1.4em !important;
        }
    }
    .menu {
        height: 46px;
        .b-tabs {
            height: 100%;
            nav, li, a {
                height: 100%;
            }
        }
        .tabs.is-toggle a {
            border: none;
            background-color: whitesmoke;
            border-radius: 0;
        }
        .tabs.is-toggle a:hover {
            background-color: #efefef;
        }
        .tabs.is-toggle li.is-active a {
            background-color: #00243C;
            border-radius: 0;
        }
    }
    .content {
        flex: 1;
    }
    .header .material-icons {
        font-size: 1em;
        right: 0;
        padding-right: 1em;
        position: absolute;
    }
    .modal {
        z-index: 9999;
    }
    .card-content .content {
        text-align: justify;
        margin-top: 1em;
    }
</style>
