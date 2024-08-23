<script setup lang="ts">
import type { SpControlPanelItemInstance, SpControlPanelProps } from './types';

// 操作面板
defineOptions({
  name: 'SpControlPanel',
});

defineSlots<{
  /** 默认插槽，放入操作面板 Item */
  default(): SpControlPanelItemInstance;
}>();

withDefaults(defineProps<SpControlPanelProps>(), {
  blurEnabled: false,
  direction: 'row',
});
</script>

<template>
  <div :class="['sp-control-panel', 'inline-flex', { blur: blurEnabled }, { 'flex-col': direction === 'column' }]">
    <slot name="default"></slot>
  </div>
</template>

<style scoped lang="scss">
.sp-control-panel {
  padding: 5px 10px;
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  background-color: var(--sp-bg-color-overlay);

  &.blur {
    background-color: rgba($color: var(--sp-bg-color-overlay-rgb), $alpha: 0.5);
    backdrop-filter: blur(5px);
  }

  &.flex-col {
    padding: 10px 5px;
  }
}
</style>
