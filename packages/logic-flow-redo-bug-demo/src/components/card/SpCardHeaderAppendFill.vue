<script setup lang="ts">
defineOptions({
  /** 卡片 header 附件充满组件，header 默认是左右对其，可以使用此组件充满后实现自己的布局 */
  name: 'SpCardHeaderAppendFill',
});

defineSlots<{
  /**
   * 默认插槽，内容
   */
  default(props: {}): any;
}>();
</script>

<template>
  <div class="sp-card-header-append-fill">
    <slot name="default"></slot>
  </div>
</template>

<style scoped lang="scss">
.sp-card-header-append-fill {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
