import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { include } from "../cache";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/HelloWorld.vue"),
    props: {
      msg: "Home",
    },
  },
  {
    path: "/tab1",
    name: "tab1",
    component: () => import("../components/HelloWorld.vue"),
    props: {
      msg: "tab1",
    },
  },
  {
    path: "/tab2",
    name: "tab2",
    component: () => import("../components/HelloWorld.vue"),
    props: {
      msg: "tab2",
    },
  },
  {
    path: "/tab3",
    name: "tab3",
    component: () => import("../components/HelloWorld.vue"),
    props: {
      msg: "tab3",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeResolve(async (to) => {
  include.value.push(to.fullPath);
});

export default router;
