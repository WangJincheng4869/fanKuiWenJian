<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { isNull } from 'lodash-unified';
import { computed, ref } from 'vue';
defineOptions({
  name: 'SpCard',
});

withDefaults(
  defineProps<{
    /**
     * 标题内容
     */
    title?: string;
    /**
     * 是否显示标题下划线
     */
    titleUnderline?: boolean;
    /**
     * 是否清除 body padding
     */
    clearBodyPadding?: boolean;
  }>(),
  { titleUnderline: true, clearBodyPadding: false },
);

const slots = defineSlots<{
  /**
   * 默认插槽，面板内容
   */
  default(props: {}): any;
  /**
   * header 栏
   */
  header(props: {}): any;
  /**
   * header 栏补充内容，当使用默认 header 时可以使用此插槽添加自定义补充内容，如在标题后添加图标、按钮等
   */
  headerAppend(props: {}): any;
}>();

const spCardHeaderRef = ref<HTMLElement | undefined>();
// 实时获取 header 高度
const { height: headerHeight } = useElementSize(spCardHeaderRef);

const bodyStyle = computed(() => {
  if (isNull(headerHeight.value)) {
    return {};
  }
  // 如果没有 header 则内容高度为 100%
  if (headerHeight.value === 0) {
    return { height: '100%' };
  }
  // header 高度  = 内容高度 + padding + 下边框
  return { height: `calc(100% - ${headerHeight.value + 14 + 4}px)` };
});
</script>

<template>
  <div :class="['sp-card', { 'clear-body-padding': clearBodyPadding, 'title-underline': titleUnderline }]">
    <div v-if="slots.header != null || title" ref="spCardHeaderRef" class="sp-card__header">
      <slot name="header">
        <div class="sp-card-title">{{ title }}</div>
      </slot>
      <slot name="headerAppend"></slot>
    </div>
    <div class="sp-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>
