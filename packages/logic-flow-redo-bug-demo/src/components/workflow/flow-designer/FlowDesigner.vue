<script setup lang="ts">
import type { ActiveLogicFlowData } from '@/components/flow-designer/types';
import LogicFlow from '@logicflow/core';
import '@logicflow/core/lib/style/index.css';
import '@logicflow/extension/lib/style/index.css';
import { patternItems } from './dnd-panel';
import { NodeType } from './enum/node-type';
import { typeOptionMap } from './flow-setting-panel/consts';
import FlowSettingPanelItemTypeSelect from './flow-setting-panel/FlowSettingPanelItemTypeSelect.vue';
import FlowSettingPanelItemCandidate from './flow-setting-panel/user-task/FlowSettingPanelItemCandidate.vue';
import { nodeRegistrar } from './node';
import { ref } from 'vue';
import SpFlowDesignerSettingPanelItemName from '@/components/flow-designer/SpFlowDesignerSettingPanelItemName.vue';
import SpFlowDesigner from '@/components/flow-designer/SpFlowDesigner.vue';

defineOptions({
  name: 'FlowDesigner',
});

const graphData = {
  nodes: [
    {
      id: 'node_id_1',
      type: 'rect',
      x: 100,
      y: 100,
      text: { x: 100, y: 100, value: '节点1' },
      properties: {},
    },
    {
      id: 'node_id_2',
      type: 'circle',
      x: 200,
      y: 300,
      text: { x: 300, y: 300, value: '节点2' },
      properties: {},
    },
  ],
  edges: [
    {
      id: 'edge_id',
      type: 'polyline',
      sourceNodeId: 'node_id_1',
      targetNodeId: 'node_id_2',
      text: { x: 139, y: 200, value: '连线' },
      startPoint: { x: 100, y: 140 },
      endPoint: { x: 200, y: 250 },
      pointsList: [
        { x: 100, y: 140 },
        { x: 100, y: 200 },
        { x: 200, y: 200 },
        { x: 200, y: 250 },
      ],
      properties: {},
    },
  ],
};

const activeData = ref<ActiveLogicFlowData>();
const logicFlow = ref<LogicFlow>();

const initializedHandler = (lf: LogicFlow) => {
  // 登记自定义节点
  nodeRegistrar.registerAll(lf);

  // 加载数据
  lf.render(graphData);
};
</script>

<template>
  <SpFlowDesigner
    v-model:active-data="activeData"
    v-model:logic-flow="logicFlow"
    :drag-menu-pattern-items="patternItems"
    @initialized="initializedHandler"
  >
    <SpFlowDesignerSettingPanelItemName />
    <!-- 类型选择组件，可以选择网关类型、结束节点类型 -->
    <flow-setting-panel-item-type-select v-if="typeOptionMap.has(activeData?.type ?? '')" />
    <!-- 只有用户任务节点才有这些配置项 -->
    <template v-if="activeData?.type === NodeType.USER_TASK">
      <!-- 节点候选者组件，可以设置节点候选处理者 -->
      <flow-setting-panel-item-candidate />
    </template>
  </SpFlowDesigner>
</template>

<style scoped lang="scss"></style>
