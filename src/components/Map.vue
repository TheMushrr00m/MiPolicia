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
                console.log('marker position changed!');
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
                    console.log(results);
                    if(this.layer) {
                        this.map.removeLayer(this.layer);
                    }
                    this.layer = L.featureGroup(results).addTo(this.map);
                    this.map.flyTo(position, 17);
                    this.marker.bindPopup("<div class=\"marker-content\">" +
                                          "<p class=\"marker-title\">Sector: " + results[0].feature.properties.Sector + "</p>" +
                                          "<h1 class=\"marker-subtitle\">Zona: " + results[0].feature.properties.Zona + "</h1>" +
                                          "<p class=\"marker-text\"><b>Teléfono:</b> <a href=\"tel:" + results[0].feature.properties.Tel + "\">" + results[0].feature.properties.Tel + "</a></p>" +
                                          "<p class=\"marker-text\"><b>Nextel:</b> <a href=\"tel:" + results[0].feature.properties.Nextel + "\">" + results[0].feature.properties.Nextel + "</a></p>" +
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

    .leaflet-popup-content-wrapper{
        border-radius: 0;
    }
    .marker-content{
        .marker-title{
            margin-top: 0;
            margin-bottom: 0.5em;
            font-size: 1.2em;
            color: #00243C;
        }
        .marker-subtitle{
            margin-top: 0;
            margin-bottom: 0.5em;
            font-size: 1em;
            color: darkgrey;
        }
        .marker-text{
            margin-top: 0;
            margin-bottom: 0.5em;
        }
    }
</style>