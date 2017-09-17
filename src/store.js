import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        activeTab: 0
    },
    mutations: {
        update(state, payload) {
            state.activeTab = payload;
        }
    }
});