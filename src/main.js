import Vue from 'vue'
import Buefy from 'buefy'
import VueRouter from 'vue-router'
import { routes } from './routes';
import App from './App.vue'
import Map from './components/Map.vue'
import { store } from './store';

Vue.use(VueRouter);
Vue.use(Buefy);
Vue.component('leaflet-map', Map);

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
