<script setup lang="ts">
import SpIcon from '@/components/sp-icon/SpIcon.vue';

// 这是一个内容注释的 tip 组件，会用一个图标显示注释内容，多数用于详细介绍某个表单、功能的详细用法
defineOptions({
  name: 'SpAnnotationTip',
});

withDefaults(
  defineProps<{
    /** 要标注的文本内容 */
    text?: string;
    /** 标注内容 */
    content?: string;
    /**
     * icon 大小
     * @default '17px'
     */
    iconSize?: string;
    /**
     * tip 出现位置
     * @default 'top'
     */
    placement?:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end';
  }>(),
  {
    iconSize: '17px',
    placement: 'top',
  },
);

defineSlots<{
  /** 自定义标注内容 */
  default: () => void;
}>();
</script>

<template>
  <div class="inline-flex items-center gap-1">
    <span v-if="text">{{ text }}</span>
    <el-tooltip :placement="placement" :show-after="500">
      <template #content>
        <slot name="default">{{ content }}</slot>
      </template>
      <SpIcon name="tips" :size="iconSize" />
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss"></style>
