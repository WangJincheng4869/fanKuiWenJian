import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
];

let modulesRouteRecord: Record<string, any> = import.meta.glob("../components/**/router/index.ts", {
  eager: true,
});

Object.keys(modulesRouteRecord).forEach((key) => {
  let modulesRoutes: RouteRecordRaw[] = modulesRouteRecord[key].default;
  modulesRoutes.forEach((route) => {
    if (import.meta.env.VITE_CUSTOMIZATION_MODULE === "test") {
      routes.push(route);
    }
  });
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
