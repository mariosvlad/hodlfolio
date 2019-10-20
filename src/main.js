import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import './registerServiceWorker';

sync(store, router);

Vue.config.productionTip = false;

Vue.use(Vuetify);

const VuetifyOpts = {
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    dark: true,
  },
};

new Vue({
  vuetify: new Vuetify(VuetifyOpts),
  router,
  store,
  render: h => h(App),
}).$mount('#app');
