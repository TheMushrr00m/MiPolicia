<template>
    <div id="app">
        <div class="header">
                <h1>Mi Policía</h1>
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
                         this.$router.push({ name: 'home' });
                        break;
                    case 1:
                         this.$router.push({ name: 'deposit' });
                        break;
                    case 2:
                         this.$router.push({ name: 'reporting' });
                        break;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '~buefy/lib/buefy.css';

    html, body, #app{
        height: 100%;
        width: 100%;
        margin: 0;
        background-color: #efefef;
    }
    .main-content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .header{
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #00243C;
        color: white;
        text-align: center;
        h1{
            margin: 0;
        }
    }
    .menu{
        flex: 5;
        .b-tabs{
            height: 100%;
            nav, li, a{
                height: 100%;
            }
        }
        .tabs.is-toggle a {
            border: none;
            background-color: whitesmoke;
        }
        .tabs.is-toggle a:hover{
            background-color: #efefef;
        }
        .tabs.is-toggle li.is-active a{
            background-color: #00243C;
        }
        .tabs.is-toggle li:first-child a{
            border-radius: 0;
        }
    }
    .content{
        flex: 100;
    }
</style>
