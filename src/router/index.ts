import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Search from '../views/Search.vue';
import Profile from '../views/Profile.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Search',
    component: Search,
    meta: {
      title: 'DevFinder - Search'
    }
  },
  {
    path: '/profile/:login',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'DevFinder - Profile'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
