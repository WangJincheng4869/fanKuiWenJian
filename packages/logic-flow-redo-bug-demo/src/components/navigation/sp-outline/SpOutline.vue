<script setup lang="ts">
import type { SpOutlineProps } from './types';

// todo 这是 SpAnchorPoint 的优化版本，还没开发完成
// 页面大纲组件，用于提取标题生成导航菜单
defineOptions({
  name: 'SpOutline',
});

const props = withDefaults(defineProps<SpOutlineProps>(), {
  title: '本页目录',
  anchorSelectors: 'h2,h3',
  width: '100%',
  height: '100%',
});

// 标题元素名称
const hTagNameSet = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

// 是否开启层级导航
const levelEnabled = computed(() => {
  const selectors = props.anchorSelectors.split(',').map(item => item.trim());
  if (selectors.length === 1) {
    return false;
  }
  return selectors.filter(selector => hTagNameSet.has(selector)).length > 1;
});

const outlineEls = shallowRef<Element[]>([]);

const grabEl = () => {
  const el = typeof props.el === 'string' ? document.querySelector(props.el) : props.el;
  if (!el) {
    console.warn('页面大纲组件，用于提取标题生成导航菜单 - 未找到指定元素', props.el);
    return;
  }
  if (levelEnabled.value) {
    // 多层级导航
  } else {
    // 单层级导航
    el.querySelectorAll(props.anchorSelectors).forEach(itemEl => {
      outlineEls.value.push(itemEl);
    });
  }
};
</script>

<template></template>

<style scoped lang="scss"></style>
