import './Core/UI/TitlebarButtons';
import './Core/UI/ContextMenu';
import './Core/UI/ExternalLinks';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './Components/App.vue';

import routes from './app_routes';
import store from './app_store';

import Titlebar from './Components/Titlebar.vue';
import Menu from './Components/Menu.vue';
import BasicInput from './Components/Form/BasicInput.vue';
import FlagInput from './Components/Form/FlagInput.vue';

Vue.config.productionTip = false;
Vue.component('titlebar', Titlebar);
Vue.component('main-menu', Menu);
Vue.component('basic-input', BasicInput);
Vue.component('flag-input', FlagInput);

const router = new VueRouter({ routes });
new Vue({
  components: { App },
  template: '<App/>',
  store,
  router
}).$mount('#app');
