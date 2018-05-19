import Vue from 'vue';
import Router from 'vue-router';
import Hello from '../views/Hello.vue';
import Wallet from '../views/Wallet.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/w/:id',
      name: 'Wallet',
      component: Wallet,
    },
    {
      path: '/androidapp',
      redirect: () => {
        const existingWallet = localStorage.getItem('wallet');
        if (existingWallet) {
          return `/w/${existingWallet}`;
        }
        return '/';
      },
    },
  ],
});
