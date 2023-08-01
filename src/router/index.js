import { createRouter, createWebHistory } from 'vue-router';
import { beforeEach, afterEach } from './guard';

const routes = [
  {
    path: '/',
    redirect: '/demo',
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('views/demo/index.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('views/test/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

router.beforeEach(beforeEach);
router.afterEach(afterEach);

export default router;
