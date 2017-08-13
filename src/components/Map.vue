<template>
    <div id="map" class="map"></div>
</template>

<script>
    import * as L from 'leaflet';
    import * as leafletPip from '@mapbox/leaflet-pip'
    const init_position = [19.4324905, -99.1333819]; //CDMX Zócalo

    export default {
        props: ['markerPosition', 'geojson'],
        data(){
            return{
                map: null,
                marker: null,
                json: null,
                layer: null
            }
        },
        watch:{
            'markerPosition': function(value) {
                this.marker.setLatLng(value);
            },
            'geojson': function(geojson){
                this.json = geojson;
                this.showLayer();
            }
        },
        methods:{
            showLayer(){
                const gjLayer = L.geoJson(this.json);
                const position = this.marker.getLatLng();
                let results = leafletPip.pointInLayer(position, gjLayer, true);
                if (results.length > 0){
                    if(this.layer) {
                        this.map.removeLayer(this.layer);
                    }
                    this.layer = L.featureGroup(results).addTo(this.map);
                    this.map.flyTo(position, 17);
                    this.marker.bindPopup("<div class=\"marker-content\">" +
                                          "<div class=\"details\">" +
                                          "<h1 class=\"marker-title\">" + 'Tu cuadrante es del sector <b>'  + results[0].feature.properties.Sector.toLowerCase().replace( /\b./g, (a) => { return a.toUpperCase(); } ) + "</b><br>" +
                                          ' en la zona <b>' + results[0].feature.properties.Zona.toLowerCase().replace( /\b./g, (a) => { return a.toUpperCase(); } ) + '</b>.<br>' +
                                          "</h1>" +
                                          "<p class=\"marker-subtitle\">Para marcar y solicitar apoyo presiona <br> cualquiera de las siguientes opciones:</p>" +
                                          "</div>" +
                                          "<div class='button-container'>" +
                                          "<button onclick=window.location.href='tel:" + results[0].feature.properties.Tel + "\'" + " class=\"button-marker with-margin\" target=\"_blank\">Llamar al cuadrante</button>" +
                                          "<button onclick=window.location.href='tel:911' class=\"button-marker\" target=\"_blank\">Llamar al 911</button>" +
                                          "</div>" +
                                          "</div>").openPopup();
                } else {
                    this.$snackbar.open({
                        duration: 5000,
                        message: 'No se encontró un cuadrante para la ubicación.',
                        type: 'is-info',
                        position: 'is-top'
                    });
                }
            }
        },
        mounted(){
             // initialize the map on the "map" div with a given center and zoom
            this.map = L.map('map').setView(init_position, 15);
            // Add Tile Layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
            this.map.attributionControl.setPrefix('');
            const icon = new L.Icon.Default();
            icon.options.shadowSize = [0,0];
            this.marker = L.marker(init_position, {icon : icon, draggable: true}).addTo(this.map);
            this.marker.on('dragend', this.showLayer);
        }
    }
</script>

<style lang="scss">
    @import "~leaflet/dist/leaflet.css";

    .button-marker{
        height: 3.2em;
        width: 8em;
        background: #00243C;
        color: white !important;
        border-radius: 3px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
        border: none;
        cursor: pointer;

        &.with-margin{
            margin-right: 3.8em;
        }
    }
    .button-container{
        margin-bottom: 1.2em;
        text-align: center;
        display: flex;
        justify-content: center;
    }
    .details{
        margin-bottom: 1.1em;
    }
    .leaflet-popup-content-wrapper{
        border-radius: 0;
    }
    .marker-content{
        .marker-title{
            margin-top: 0;
            margin-bottom: 0.2em;
            font-size: 1.2em;
            color: #00243C;
        }
        .marker-subtitle{
            margin-top: 0.8em;
            margin-bottom: 0.5em;
            font-size: 1em;
            color: grey;
            font-weight: bold;
        }
        .marker-text{
            margin-top: 0;
            margin-bottom: 0.5em;
        }
    }
</style>