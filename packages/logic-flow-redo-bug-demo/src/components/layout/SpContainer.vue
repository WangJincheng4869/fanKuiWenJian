<script setup lang="ts">
defineOptions({
  // 布局容器组件，会带有通用的 padding，宽高均为 100%
  name: 'SpContainer',
});

defineSlots<{
  default(): any;
}>();
</script>

<template>
  <div class="sp-container">
    <slot name="default"></slot>
  </div>
</template>

<style scoped lang="scss">
.sp-container {
  width: 100%;
  height: 100%;
  padding: var(--sp-space-wrap-default);
}
</style>
