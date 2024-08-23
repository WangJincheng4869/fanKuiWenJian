<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { isNull } from 'lodash-unified';
import { computed, ref } from 'vue';

defineOptions({
  // 上下结构的组件 header 高度自适应，main 高度为 100% - header 高度
  name: 'SpHeaderMain',
});

defineSlots<{
  header(): any;
  main(): any;
}>();

const headerRef = ref<HTMLElement | null>(null);

// 实时获取 header 高度
const { height: headerHeight } = useElementSize(headerRef);

// 内容 main 高度
const mainStyle = computed(() => {
  if (isNull(headerHeight.value)) {
    return {};
  }
  if (headerHeight.value === 0) {
    return { height: '100%' };
  }
  return { height: `calc(100% - ${headerHeight.value}px)` };
});
</script>

<template>
  <div class="h-full w-full">
    <div ref="headerRef" class="w-full">
      <slot name="header"></slot>
    </div>
    <div class="w-full" :style="mainStyle">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
