import Home from './Home.vue';

const Deposit = resolve => {
    require.ensure(['./Deposit.vue'], () => {
        resolve(require('./Deposit.vue'));
    });
};

const Reporting = resolve => {
    require.ensure(['./Reporting.vue'], () => {
        resolve(require('./Reporting.vue'));
    });
};

export const routes = [
    { path: '', name: 'home', component: Home},
    { path: '/deposit', name: 'deposit', component: Deposit },
    { path: '/reporting', name: 'reporting', component: Reporting},
    { path: '*', redirect: '/' }
];