import Vue from 'vue';
import VueRouter from 'vue-router';
import Hello from '../views/Hello.vue';
import Wallet from '../views/Wallet.vue';

Vue.use(VueRouter);

const routes = [
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
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
