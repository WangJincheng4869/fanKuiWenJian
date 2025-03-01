<script setup lang="ts">
import { ClientOnly } from 'vuepress/client';

// 详情弹窗
defineOptions({
  name: 'SpDetailsPopover',
});

defineProps<{
  name?: string;
  width?: string | number;
}>();

defineSlots<{
  default(): any;
}>();
</script>

<template>
  <span style="align-items: center; display: inline-flex">
    <code v-if="name" style="margin-right: 0.25rem">{{ name }}</code>
    <client-only>
      <el-popover trigger="click" :width="width">
        <template #default>
          <slot></slot>
        </template>
        <template #reference>
          <el-button text style="padding: 8px">
            <sp-icon name="tips" size="18px"></sp-icon>
          </el-button>
        </template>
      </el-popover>
    </client-only>
  </span>
</template>
