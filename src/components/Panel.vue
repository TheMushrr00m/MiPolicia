<template>
    <b-panel :collapsible="true" :header="realTitle">
        <div class="content">
            <p class="subtitle">
                El día {{ date }} a las {{ rtime }} hrs.
            </p>
            <div v-if="this.title != '2'" class="details">
                <p class="details-text"><b>Dirección:</b> {{ address }}</p>
                <p class="details-text"><b>Teléfono:</b> <a :href="trimmedPhone">{{ phone }}</a></p>
            </div>

            <div v-else class="details">
                <p class="details-text">Tu automóvil con placas <b>{{ plate.toUpperCase() }}</b>
                    fue entregado en el depósito <b>{{ deposit }}</b>.</p>
            </div>

             <div v-if="this.title != '2'" class="map-container">
                 <depositMap :id="this.id" :markerPosition="{lat: this.lat, lng: this.lng }"></depositMap>
             </div>
        </div>
    </b-panel>
</template>

<script>
    import SmallMap from './SmallMap.vue'

    export default {
        props:['title', 'date', 'rtime', 'address', 'phone', 'plate', 'deposit', 'id', 'lat', 'lng'],
        components:{
          depositMap: SmallMap
        },
        computed:{
            realTitle(){
                switch (this.title){
                    case '0':
                        return "En arrastre al depósito " + this.deposit;
                        break;
                    case '1':
                        return "Llegada al depósito " + this.deposit;
                        break;
                    case '2':
                        return "Entrega de automóvil con placa " + this.plate.toUpperCase();
                        break;
                    case '3':
                        return "Cambio de ubicación al depósito  " + this.deposit;
                        break;
                }
            },
            trimmedPhone(){
                return 'tel:' + this.phone.replace(/\s/g, '');
            }
        }
    }
</script>

<style>
    .details{
        margin: 0.5em 0;
    }
    .map-container{
        height: 150px;
    }
    .details-text, .subtitle{
        text-align: justify;
    }
</style>