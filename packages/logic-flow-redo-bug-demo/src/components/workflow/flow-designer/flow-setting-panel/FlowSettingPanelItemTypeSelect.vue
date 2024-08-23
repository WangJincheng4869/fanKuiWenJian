<script setup lang="ts">
import { useLogicFlow } from '@/components/flow-designer/hooks/use-logic-flow';
import { defaultNameMap, typeOptionMap } from './consts';
import { computed } from 'vue';

// 类型选择组件，可以选择网关类型、结束节点类型
defineOptions({
  name: 'FlowSettingPanelItemTypeSelect',
});

const { activeData, lf } = useLogicFlow();

// 获取当前可切换的类型
const typeOptions = computed(() => {
  const type = activeData.value?.type;
  if (!type) {
    return;
  }
  return typeOptionMap.get(type);
});

// 节点、连线名称
const type = computed({
  get: () => {
    return activeData.value?.type ?? '';
  },
  set: (val: string) => {
    if (!activeData.value) {
      console.warn('当前没有选择任何节点或连线，不能修改类型。');
      return;
    }
    const name = activeData.value.text?.value;
    // 是否需要修改名字，只有没有修改默认名的时候才会修改名字
    const updateName = name && defaultNameMap.get(activeData.value?.type) === name;
    // 修改节点类型
    lf.value?.changeNodeType(activeData.value.id, val);
    // 修改后继续选中当前节点
    lf.value?.selectElementById(activeData.value.id);
    // 修改节点名称
    if (updateName) {
      lf.value?.updateText(activeData.value.id, defaultNameMap.get(val) ?? '');
    }
    activeData.value = lf.value?.getDataById(activeData.value.id);
  },
});
</script>

<template>
  <el-form-item v-if="typeOptions" label="类型">
    <el-select v-model="type" placeholder="请选择" class="w-full">
      <el-option v-for="item in typeOptions" :key="item.type" :label="item.label" :value="item.type" />
    </el-select>
  </el-form-item>
</template>
