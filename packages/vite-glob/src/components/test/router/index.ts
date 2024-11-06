import type { RouteRecordRaw } from 'vue-router';
export default [
  {
    path: '/test',
    name: 'Test',
    component: () => import('../Test.vue'),
  },
] as Array<RouteRecordRaw>;
