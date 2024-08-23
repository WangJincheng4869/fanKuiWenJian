<script setup lang="ts">
import { useLogicFlow } from '@/components/flow-designer/hooks/use-logic-flow';
import type { NodeData } from '@/components/flow-designer/types';
import { computed, watch } from 'vue';
import { DEFAULT_NODE_CANDIDATE_TYPE } from '../../node/consts';
import { DefaultTaskInstance } from '../../node/properties/task-instance';
import type { NodeCandidate, NodeCandidateType, UserTaskProperties } from '../../node/types';
import { useFlowSettingPanelI18n } from '../i18n';
import FlowSettingPanelItemCandidateMultiInstance from './FlowSettingPanelItemCandidateMultiInstance.vue';

// 用户任务节点专用，节点候选人配置组件，只能用在 SpFlowDesignerSettingPanel 组件内
defineOptions({
  name: 'FlowSettingPanelItemCandidate',
});

const { setProperty, activeData } = useLogicFlow<NodeData<UserTaskProperties>>();

const nodeCandidate = computed<NodeCandidate | undefined>(() => activeData.value?.properties?.candidate);

// 节点候选者类型
const nodeCandidateType = computed({
  get: () => {
    return nodeCandidate.value?.type ?? DEFAULT_NODE_CANDIDATE_TYPE;
  },
  set: (val: NodeCandidateType) => {
    setProperty('candidate.type', val);
  },
});

// 监听节点候选人，如果只有一个人，那么多任务类型恢复会默认值，即：单例（竟签）模式
watch(
  () => nodeCandidate.value?.employees?.length,
  (length?: number) => {
    if (!length || length < 2) {
      setProperty('taskInstance', new DefaultTaskInstance());
    }
  },
);


const { i18nData } = useFlowSettingPanelI18n();
</script>

<template>
  <!-- 节点候选者类型 -->
  <el-form-item :label="i18nData.nodeCandidateType">
    <el-radio-group v-model="nodeCandidateType" size="small">
      <el-radio-button value="employee">员工</el-radio-button>
      <el-radio-button value="department">部门</el-radio-button>
      <el-radio-button value="skill">技能</el-radio-button>
      <el-radio-button value="role">角色</el-radio-button>
      <el-radio-button value="jobPosition">岗位</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <!-- 多实例任务配置 -->
  <flow-setting-panel-item-candidate-multi-instance
    v-if="nodeCandidateType !== 'employee' || (nodeCandidate?.employees && nodeCandidate?.employees?.length > 1)"
  />
</template>
