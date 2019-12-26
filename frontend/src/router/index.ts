import Vue from 'vue';
import VueRouter from 'vue-router';
import MandaraView from '../views/MandaraView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MandaraView',
    component: MandaraView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
