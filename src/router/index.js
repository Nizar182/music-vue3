import { createRouter, createWebHistory } from 'vue-router';
import SongList from '../views/SongList.vue';
import lirik from '../views/lirik.vue';

const routes = [
  {
    path: '/',
    name: 'SongList',
    component: SongList,
  },
  {
    path: '/lirik',
    name: 'lirik',
    component: lirik,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;