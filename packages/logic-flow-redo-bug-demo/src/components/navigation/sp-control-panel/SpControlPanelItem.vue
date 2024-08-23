<script setup lang="ts">
import SpIcon from '@/components/sp-icon/SpIcon.vue';
import type { SpControlPanelItemProps } from './types';

// 操作面板选项
defineOptions({
  name: 'SpControlPanelItem',
});

withDefaults(defineProps<SpControlPanelItemProps>(), {
  disabled: false,
  active: false,
});

defineSlots<{
  /** 默认插槽，您可以自定义你的按钮 */
  default(): any;
  /** 图标 */
  icon(): any;
  /** 名字 */
  name(): any;
}>();
</script>

<template>
  <button
    :class="['sp-control-panel-item', 'flex', { 'is-disabled': disabled }, { 'is-active': active }]"
    :disabled="disabled"
  >
    <slot name="default">
      <div class="control-icon">
        <slot name="icon">
          <SpIcon v-if="icon" size="20px" :name="icon" />
        </slot>
      </div>
      <div class="control-name">
        <slot name="name">{{ name }}</slot>
      </div>
    </slot>
  </button>
</template>

<style scoped lang="scss">
.sp-control-panel-item {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: var(--el-border-radius-base);
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s,
    transform 0.1s;
  min-width: 50px;
  border: none;
  background: transparent;
  outline: none;

  &.is-disabled {
    cursor: not-allowed;
    color: var(--el-text-color-disabled);
  }

  &.is-active {
    color: var(--el-color-primary);
  }

  &:not(.is-disabled):hover {
    background-color: var(--el-fill-color-light);
  }

  &:not(.is-disabled):active {
    transform: scale(0.95);
  }

  .control-icon {
    line-height: 1;
  }

  .control-name {
    margin-top: 2px;
    font-size: 12px;
    user-select: none;
  }
}

.sp-control-panel {
  &.blur {
    padding: 5px 10px;
    box-shadow: var(--el-box-shadow-light);
    border-radius: var(--el-border-radius-base);
    background-color: var(--sp-bg-color-overlay);

    .sp-control-panel-item:not(.is-disabled):hover {
      background-color: rgba($color: var(--el-fill-color-light-rgb), $alpha: 0.5);
      backdrop-filter: blur(5px);
    }
  }

  &.flex-col {
    .sp-control-panel-item {
      padding: 6px 10px;
    }
  }
}
</style>
