<script setup lang="ts">
import { computed, type StyleValue } from 'vue';
import { iconHolder } from './icon-holder';
import type { SpIconProps } from './types';

const props = withDefaults(defineProps<SpIconProps>(), {
  name: 'unknown-animate',
});

// 图标旋转样式
const svgStyle = computed(() => {
  let style: StyleValue = {};
  let transform = '';
  if (props.rotate) {
    transform += `rotate(${props.rotate}) `;
  }
  if (props.rotateX) {
    transform += `rotateX(${props.rotateX}) `;
  }
  if (props.rotateY) {
    transform += `rotateY(${props.rotateY}) `;
  }
  if (transform) {
    transform = transform.trimEnd();
    style.transform = transform;
  }
  return style;
});

const IconComponent = computed(() => {
  return iconHolder.getIcon(props.name);
});

// 图标组件包括自定义样式
const iconBoxStyle = computed(() => {
  let style: StyleValue = {};
  if (props.size) {
    style.fontSize = props.size;
  }
  return style;
});
</script>

<template>
  <i class="sp-icon" :style="iconBoxStyle">
    <component :is="IconComponent" :style="svgStyle" />
  </i>
</template>
