import Vue from 'vue';
import VueRouter from 'vue-router';

import CharacterView from './Components/View/Character.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: CharacterView },
];

export default routes;