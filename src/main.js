import Vue from 'vue'
import Buefy from 'buefy'
import VueRouter from 'vue-router'
import { routes } from './routes';
import App from './App.vue'
import Map from './components/Map.vue'
import { store } from './store';
import VueAnalytics from 'vue-analytics'

Vue.use(VueRouter);
Vue.use(Buefy);
Vue.component('leaflet-map', Map);

const router = new VueRouter({
    routes
});

Vue.use(VueAnalytics, {id: 'UA-73673844-3', router, autoTracking: { exception: true }})

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
