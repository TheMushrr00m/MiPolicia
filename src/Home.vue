<template>
    <leaflet-map :markerPosition="markerPosition" :geojson="json_data"></leaflet-map>
</template>

<script>
    import axios from 'axios';

    export default {
        data(){
            return{
                json_data: {},
                markerPosition: [],
                loadingComponent: null
            }
        },
        methods:{
            openLoading() {
                this.loadingComponent = this.$loading.open();
            },
            closeLoading(){
                this.loadingComponent.close();
            },
            updateMarkerPosition(lat, long){
                this.markerPosition = [];
                this.markerPosition.push(lat);
                this.markerPosition.push(long);
            },
            showMatchedPolygon(geojson){
                this.json_data = geojson;
            },
            getLocation(){
                getPosition()
                    .then((position) => {
                        this.closeLoading();
                        this.updateMarkerPosition(position.coords.latitude, position.coords.longitude);
                        this.showMatchedPolygon(this.json_data);
                    })
                    .catch((err) => {
                        this.$snackbar.open({
                            duration: 5000,
                            message: 'GPS apagado, puedes utitlizar la app arrastrando el pin.',
                            type: 'is-info',
                            position: 'is-top'
                        });
                        this.closeLoading();
                        this.updateMarkerPosition(19.4324905, -99.1333819); //CDMX Zócalo
                        this.showMatchedPolygon(this.json_data);
                        console.error(err.message);
                    });
            }
        },
        beforeCreate(){
           /*if (window.location.protocol !== 'https:') {
                window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
           }*/
        },
        created() {
            this.openLoading();
            axios.get('/src/assets/Cuadrantes_2015.geojson')
            .then(response => {
                getPosition()
                    .then((position) => {
                        this.closeLoading();
                        this.updateMarkerPosition(position.coords.latitude, position.coords.longitude);
                        this.showMatchedPolygon(response.data);
                    })
                    .catch((err) => {
                        this.$snackbar.open({
                            duration: 5000,
                            message: 'GPS apagado, puedes utitlizar la app arrastrando el pin.',
                            type: 'is-warning',
                            position: 'is-top',
                            actionText: 'Reintentar',
                            onAction: () => {
                                this.getLocation();
                            }
                        });
                        this.closeLoading();
                        this.updateMarkerPosition(19.4324905, -99.1333819); //CDMX Zócalo
                        this.showMatchedPolygon(response.data);
                        console.error(err.message);
                    });
            })
            .catch(e => {
                this.$toast.open({
                    duration: 5000,
                    message: 'Algo falló, recarga la página.',
                    type: 'is-danger'
                });
                this.closeLoading();
                console.log(e)
            })
        }
    }

    let getPosition = function (options) {
        return new Promise(function (resolve, reject) {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            }
        });
    };
</script>

<style lang="scss">
    #map{
        height: 100%;
    }

    .loading-overlay .loading-icon:after {
        border-left-color: #00243C;
        border-bottom-color: #00243C;
    }
    .loading-overlay {
        z-index: 9999;
    }
</style>
