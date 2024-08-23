<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { isNull } from 'lodash-unified';
import SpContainer from './SpContainer.vue';
import { computed, ref } from 'vue';

defineOptions({
  // 左右结构，带侧边栏的布局
  name: 'SpWithSidebar',
});

defineSlots<{
  default(props: {}): any;
  sidebar(props: {}): any;
}>();

const sidebarBoxRef = ref<HTMLElement | undefined>();
// 实时获取 sidebarBox 宽度
const { width: sidebarBoxWidth } = useElementSize(sidebarBoxRef);

// 内容 body 宽度
const bodyStyle = computed(() => {
  if (isNull(sidebarBoxWidth.value)) {
    return {};
  }
  if (sidebarBoxWidth.value === 0) {
    return { width: '100%' };
  }
  return { width: `calc(100% - ${sidebarBoxWidth.value}px)` };
});
</script>

<template>
  <sp-container class="sp-layout-sidebar">
    <div class="sp-layout-sidebar__body" :style="bodyStyle">
      <slot></slot>
    </div>
    <div ref="sidebarBoxRef" class="sp-layout-sidebar__sidebar">
      <slot name="sidebar"></slot>
    </div>
  </sp-container>
</template>

<style scoped lang="scss">
.sp-layout-sidebar {
  display: flex;

  .sp-layout-sidebar__body {
    flex-grow: 1;
    padding-right: 12px;
  }

  .sp-layout-sidebar__sidebar {
    flex-shrink: 0;
  }
}
</style>
