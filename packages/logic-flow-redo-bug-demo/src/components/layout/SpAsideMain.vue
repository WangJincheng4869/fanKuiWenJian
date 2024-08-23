<script setup lang="ts">
import { computed } from 'vue';

// 这是一个左右结构的布局组件，支持为 aside 设置宽度，main 的宽度为 100% - asideWidth。
defineOptions({
  name: 'SpAsideMain',
});

const props = withDefaults(
  defineProps<{
    /** 左侧宽度 */
    asideWidth?: string;
    /** 是否显示分割线 */
    divider?: boolean;
    /** 间距大小，aside 与 main 的间距大小 */
    space?: 'default' | 'small' | 'large';
    /** 上内边距 */
    pt?: string;
  }>(),
  { asideWidth: '260px', divider: true },
);

defineSlots<{
  /** 左侧内容 */
  aside(): any;
  /** 右侧内容 */
  main(): any;
}>();

// 水平边距类名
const horizontalSpaceClass = computed(() => {
  return props.space ? `sp-aside-main-space sp-aside-main-space__${props.space}` : '';
});
</script>

<template>
  <div :class="['sp-aside-main flex w-full h-full', horizontalSpaceClass]">
    <div :class="['sp-aside-main__aside h-full', { 'sp-aside-main__divider': divider }]">
      <slot name="aside"></slot>
    </div>
    <div class="sp-aside-main__main grow h-full">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sp-aside-main {
  &.sp-aside-main-space {
    &.sp-aside-main-space__default {
      --sp-aside-main-space: 12px;
    }

    &.sp-aside-main-space__small {
      --sp-aside-main-space: 8px;
    }

    &.sp-aside-main-space__large {
      --sp-aside-main-space: 16px;
    }

    .sp-aside-main__aside {
      padding-right: var(--sp-aside-main-space);
    }

    .sp-aside-main__main {
      padding-left: var(--sp-aside-main-space);
    }
  }

  .sp-aside-main__divider {
    border-right: 1px solid var(--el-border-color-lighter);
  }

  .sp-aside-main__aside {
    flex-shrink: 0;
    width: v-bind(asideWidth);
    padding-top: v-bind(pt);
  }

  .sp-aside-main__main {
    padding-top: v-bind(pt);
    width: calc(100% - v-bind(asideWidth));
  }
}
</style>
