<script setup lang="ts">
import { defineComponent, h, type Component, type VNode } from "vue";
import { deleteInclude, include } from "./cache";
import { useRouter } from "vue-router";

// 用 routerKey 缓存保活路由的包裹组件
const wrapComponentMap = new Map<string, Component>();

const wrap = (component: VNode, key: string) => {
  console.log("调用了 warp", key);

  let WrappedComponent = wrapComponentMap.get(key);
  if (WrappedComponent) {
    console.log("找到了 WrappedComponent");
    return WrappedComponent;
  }
  WrappedComponent = defineComponent({
    name: key,
    setup(_, { attrs, slots }) {
      return () => h(component, attrs, slots);
    },
  });
  wrapComponentMap.set(key, WrappedComponent);
  return WrappedComponent;
};

const { push } = useRouter();

const tabs = ["/tab1", "/tab2", "/tab3"];
const getNext = (key: string) => {
  const currentIndex = tabs.indexOf(key);
  if (currentIndex !== -1) {
    const nextIndex = (currentIndex + 1) % tabs.length;
    return tabs[nextIndex];
  }
  return tabs[0];
};

const closeHandler = (key: string) => {
  // 替换 include 数组会导致重新渲染，直接删除可以拿到 NAP 中存储的组件并返回，这是目前的最优解
  deleteInclude(key);
  // push(getNext(key)!);
  // wrapComponentMap.delete(key);
  push(getNext(key)!).then(() => {
    // 最好在界面跳走之后再删除 map 中的缓存，防止重新渲染时又创建新的 wrap 组件
    wrapComponentMap.delete(key);
  });
  // setTimeout(() => {
  //   wrapComponentMap.delete(key);
  // }, 300);
};
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> | <RouterLink to="/tab1">tab1</RouterLink>
    <button @click="closeHandler('/tab1')">关闭</button> | <RouterLink to="/tab2">tab2</RouterLink>
    <button @click="closeHandler('/tab2')">关闭</button> | <RouterLink to="/tab3">tab3</RouterLink>
    <button @click="closeHandler('/tab3')">关闭</button>
  </nav>
  <RouterView v-slot="{ Component, route }">
    <KeepAlive :max="128" :include="include">
      <component :is="wrap(Component, route.fullPath)" :key="route.fullPath" />
    </KeepAlive>
  </RouterView>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
