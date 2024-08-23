<script setup lang="ts">
import { useLogicFlow } from './hooks/use-logic-flow';

defineOptions({
  // 流程设置面板
  name: 'SpFlowDesignerSettingPanel',
});

defineSlots<{
  // 默认插槽可以放置表单 item 组件
  default(): any;
}>();

const { activeData } = useLogicFlow();
</script>

<template>
  <div class="flow-setting-panel">
    <el-scrollbar>
      <el-form @submit.prevent="() => {}" label-position="top" v-show="activeData" class="flow-setting-form">
        <slot name="default"></slot>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.flow-setting-panel {
  width: 310px;
  height: 100%;
  padding-left: var(--sp-space-wrap-default);
  margin-right: -10px;

  .flow-setting-form {
    padding-right: 10px;
  }
}
</style>
