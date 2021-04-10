import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';

sync(store, router);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app');
