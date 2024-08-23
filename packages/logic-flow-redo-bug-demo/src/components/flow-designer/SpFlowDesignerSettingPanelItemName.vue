<script setup lang="ts">
import { computed } from 'vue';
import { useLogicFlow } from './hooks/use-logic-flow';

// 用于设置节点、连线的名字
defineOptions({
  name: 'SpFlowDesignerSettingPanelItemName',
});

const { activeData, lf } = useLogicFlow();

// 节点、连线名称
const name = computed({
  get: () => {
    return activeData.value?.text?.value ?? '';
  },
  set: (val: string) => {
    if (!activeData.value) {
      return;
    }
    lf.value?.updateText(activeData.value.id, val);
    activeData.value = lf.value?.getDataById(activeData.value.id);
  },
});
</script>

<template>
  <el-form-item label="名字">
    <el-input v-model="name" />
  </el-form-item>
</template>
