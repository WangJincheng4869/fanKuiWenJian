<script setup lang="ts">
import { computed } from 'vue';
import { ClientOnly } from 'vuepress/client';

const props = defineProps<{
  /**
   * 组件高度
   */
  height?: string;

  /**
   * 默认内边距
   */
  padding?: string;

  /**
   * 背景颜色
   */
  bg?: 'page' | 'card' | 'image';
}>();

const boxStyle = computed(() => {
  return {
    padding: props.padding ?? '0',
    height: props.height ?? 'auto',
    'background-color': props.bg === 'page' ? 'var(--el-bg-color-page)' : 'var(--sp-bg-color-overlay)',
  };
});
</script>

<template>
  <div :class="['sp-vue-demo', { 'bg-img': bg === 'image' }]" :style="boxStyle">
    <client-only>
      <slot></slot>
    </client-only>
  </div>
</template>

<style lang="scss">
.sp-vue-demo {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);
  font-size: 14px;
  box-sizing: border-box;

  &.bg-img {
    background-image: url('/images/93821718_p0.webp');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  * {
    box-sizing: border-box;
  }
}
</style>
