<template>
    <div :id="this.id" class="map"></div>
</template>

<script>
    import * as L from 'leaflet';
    export default {
        props: ['id','markerPosition'],
        data(){
            return{
                map: null
            }
        },
        mounted(){
            console.log(this.markerPosition);
             // initialize the map on the "map" div with a given center and zoom
            this.map = L.map(this.id).setView([this.markerPosition.lat, this.markerPosition.lng], 14.5);
            this.map.dragging.disable();
            this.map.scrollWheelZoom.disable();
            // Add Tile Layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
            this.map.attributionControl.setPrefix('');
            const icon = new L.Icon.Default();
            icon.options.shadowSize = [0,0];
            this.marker = L.marker([this.markerPosition.lat, this.markerPosition.lng], {icon : icon, draggable: false}).addTo(this.map);
            this.marker.bindPopup("<a href=\"https://www.google.com/maps/dir/Current+Location/" + this.markerPosition.lat + "," + this.markerPosition.lng + "\" target=\"_blank\" class=\"button-marker\">CÓMO LLEGAR</a>").openPopup();
        }
    }
</script>

<style>
    @import "~leaflet/dist/leaflet.css";

    .map{
        height: 150px;
    }
    .button-marker{
        padding: 0.5em;
        margin-right: 0.5em;
        background: #00243C;
        color: white !important;
        border-radius: 3px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
    }
    .leaflet-popup-content-wrapper{
        border-radius: 0;
    }
</style>