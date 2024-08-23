import type { PatternItem } from '@/components/flow-designer/types';
import { NodeType } from '../enum/node-type';
import EndEvent from './EndEvent.vue';
import ExclusiveGateway from './ExclusiveGateway.vue';
import InclusiveGateway from './InclusiveGateway.vue';
import ParallelGateway from './ParallelGateway.vue';
import StartEvent from './StartEvent.vue';
import TerminateEndEvent from './TerminateEndEvent.vue';
import UserTask from './UserTask.vue';

/**
 * 自定义拖拽面板内容
 */
export const patternItems: PatternItem[] = [
  {
    type: NodeType.START_EVENT,
    label: '开始事件',
    icon: StartEvent,
  },
  {
    type: NodeType.END_EVENT,
    label: '结束事件',
    icon: EndEvent,
  },
  {
    type: NodeType.TERMINATE_END_EVENT,
    label: '结束终止事件',
    icon: TerminateEndEvent,
  },
  {
    type: NodeType.PARALLEL_GATEWAY,
    label: '并行网关',
    icon: ParallelGateway,
  },
  {
    type: NodeType.EXCLUSIVE_GATEWAY,
    label: '排他网关',
    icon: ExclusiveGateway,
  },
  {
    type: NodeType.INCLUSIVE_GATEWAY,
    label: '包容网关',
    icon: InclusiveGateway,
  },
  {
    type: NodeType.USER_TASK,
    label: '用户任务',
    icon: UserTask,
  },
];
