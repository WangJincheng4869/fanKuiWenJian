import type { MultiInstanceType, TaskInstance } from '../types';

/** 节点产生任务实例的配置项，这个类用户获取新的任务实例默认值 */
export class DefaultTaskInstance implements TaskInstance {
  type: MultiInstanceType;
  loopCardinality: string;
  completionCondition: string;

  constructor() {
    this.type = 'singleton';
    this.loopCardinality = '${nrOfLoops}';
    this.completionCondition = '${nrOfCompletedInstances/nrOfInstances >= 1}';
  }
}
