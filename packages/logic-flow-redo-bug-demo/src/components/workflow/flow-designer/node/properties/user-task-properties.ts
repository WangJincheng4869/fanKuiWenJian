import type { FormControl, NodeCandidate, TaskInstance, UserTaskProperties } from '../types';
import { DefaultNodeCandidate } from './node-candidate';
import { DefaultTaskInstance } from './task-instance';

/** 用户节点属性，这个类可以生成一个默认的用户节点属性 */
export class DefaultUserTaskProperties implements UserTaskProperties {
  taskInstance: TaskInstance;
  candidate: NodeCandidate;
  formControls: Record<number, FormControl>;
  [key: string]: any;

  constructor() {
    this.taskInstance = new DefaultTaskInstance();
    this.candidate = new DefaultNodeCandidate();
    this.formControls = {};
  }
}
