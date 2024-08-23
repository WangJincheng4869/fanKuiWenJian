/**
 * 节点类型枚举
 */
export enum NodeType {
  /** 启动事件（Start Event）： 用于表示流程的开始点，通常用一个空心圆表示。它标志着流程的启动。 */
  START_EVENT = 'StartEvent',
  /** 结束事件（End Event）： 表示流程或分支的自然结束，什么都不做。当流程有多个分支路线被激活时，最后一个分支自然结束后，流程实例结束。 */
  END_EVENT = 'EndEvent',
  /** 终止结束事件（Terminate End Event）：表示流程被强制终止，什么都不做。当流程有多个分支路线被激活时，这些分支上的活动任务也被终止。 */
  TERMINATE_END_EVENT = 'TerminateEndEvent',
  /** 并行网关（Parallel Gateway）： 用于并行执行多个分支，所有分支都会被执行。 并行网关用于无条件的拆分或合并分支，该类网关对连线条件是忽略的。并行网关有分支和合并两种行为，允许多进多出。*/
  PARALLEL_GATEWAY = 'ParallelGateway',
  /** 排他网关（Exclusive Gateway）：定义了一组分支的唯一决策，所有流出的分支被顺序评估，第一个条件被评估为true的分支被执行，并不再继续评估下面的分支 */
  EXCLUSIVE_GATEWAY = 'ExclusiveGateway',
  /** 包容网关（Inclusive Gateway）：是排他网关和并行网关的综合体。当决策时，与排他网关所不同的是，所有条件为true的后继分支都会被执行。 */
  INCLUSIVE_GATEWAY = 'InclusiveGateway',
  /** 用户任务（User Task）：代表需要人类干预或参与的任务。这通常涉及到手动操作，例如填写表单、审核文件等。用户任务是流程中的一环，直到某个用户完成任务后，流程才能继续。 */
  USER_TASK = 'UserTask',
  /** 服务任务（Service Task）： 服务任务代表由计算机系统或外部服务自动执行的任务。这可能包括调用一个API，执行某个特定的操作，或者执行一些自动化的业务逻辑。 */
  SERVICE_TASK = 'ServiceTask',
}
