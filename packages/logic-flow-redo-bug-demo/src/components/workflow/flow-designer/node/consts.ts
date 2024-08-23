import type { NodeCandidateType, MultiInstanceType } from './types';

// 默认多实例循环特性
export const DEFAULT_TASK_INSTANCE_TYPE: MultiInstanceType = 'singleton';
/**
 * 默认多实例循环次数
 *
 * `nrOfLoops` - 循环数，即根据配置的候选人数量确定。
 */
export const DEFAULT_TASK_INSTANCE_LOOP_CARDINALITY = '${nrOfLoops}';
/**
 * 默认多实例完成条件
 *
 * - `nrOfCompletedInstances` - 已完成实例数。
 * - `nrOfActiveInstances` - 活动的实例数。
 * - `nrOfInstances` - 产生的实例数。
 */
export const DEFAULT_TASK_INSTANCE_COMPLETION_CONDITION = '${nrOfCompletedInstances/nrOfInstances >= 1}';

// 默认节点候选类型
export const DEFAULT_NODE_CANDIDATE_TYPE: NodeCandidateType = 'employee';
