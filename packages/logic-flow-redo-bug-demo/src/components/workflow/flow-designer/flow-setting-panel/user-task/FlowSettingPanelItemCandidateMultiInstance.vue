<script setup lang="ts">
import { useLogicFlow } from '@/components/flow-designer/hooks/use-logic-flow';
import {
  DEFAULT_TASK_INSTANCE_COMPLETION_CONDITION,
  DEFAULT_TASK_INSTANCE_LOOP_CARDINALITY,
  DEFAULT_TASK_INSTANCE_TYPE,
} from '../../node/consts';
import type { TaskInstance, UserTaskProperties } from '../../node/types';
import { useFlowSettingPanelI18n } from '../i18n';
import type { NodeData } from '@/components/flow-designer/types';
import { computed } from 'vue';
import SpAnnotationTip from '@/components/feedback/sp-annotation-tip/SpAnnotationTip.vue';
import { ElRadioButton, ElRadioGroup } from 'element-plus';

// 多任务实例配置
defineOptions({
  name: 'FlowSettingPanelItemCandidateMultiInstance',
});

const { setProperty, activeData } = useLogicFlow<NodeData<UserTaskProperties>>();

// 节点产生任务实例的配置项
const taskInstance = computed<TaskInstance | undefined>(() => activeData.value?.properties?.taskInstance);

// 任务实例类型，当候选者有多个时必须配置，不同类型会有不同的处理方式。
const multiInstanceType = computed({
  get: () => {
    return taskInstance.value?.type ?? DEFAULT_TASK_INSTANCE_TYPE;
  },
  set: (val: any) => {
    setProperty('taskInstance.type', val);
  },
});

// 循环基数，用于限制循环任务的数量
const loopCardinality = computed({
  get: () => {
    return taskInstance.value?.loopCardinality ?? DEFAULT_TASK_INSTANCE_LOOP_CARDINALITY;
  },
  set: (val: any) => {
    setProperty('taskInstance.loopCardinality', val);
  },
});

// 完成条件，当达到这个条件时任务将自动完成进入下一环节，剩余的任务实例将废弃。
const completionCondition = computed({
  get: () => {
    return taskInstance.value?.completionCondition ?? DEFAULT_TASK_INSTANCE_COMPLETION_CONDITION;
  },
  set: (val: any) => {
    setProperty('taskInstance.completionCondition', val);
  },
});

const { i18nData } = useFlowSettingPanelI18n();
</script>

<template>
  <!-- 多任务处理方式 -->
  <el-form-item>
    <template #label>
      <SpAnnotationTip :text="i18nData.multiInstanceType">
        <p class="mt-0">{{ i18nData.singletonDescribe }}</p>
        <p>{{ i18nData.parallelDescribe }}</p>
        <p class="mb-0">{{ i18nData.sequentialDescribe }}</p>
      </SpAnnotationTip>
    </template>
    <ElRadioGroup v-model="multiInstanceType" size="small">
      <ElRadioButton value="singleton">竟签</ElRadioButton>
      <ElRadioButton value="parallel">并签</ElRadioButton>
      <ElRadioButton value="sequential">串签</ElRadioButton>
    </ElRadioGroup>
  </el-form-item>
  <template v-if="multiInstanceType !== 'singleton'">
    <el-form-item :label="i18nData.loopCardinality">
      <el-input v-model="loopCardinality" />
    </el-form-item>
    <el-form-item :label="i18nData.completionCondition">
      <el-input v-model="completionCondition" />
    </el-form-item>
  </template>
</template>
