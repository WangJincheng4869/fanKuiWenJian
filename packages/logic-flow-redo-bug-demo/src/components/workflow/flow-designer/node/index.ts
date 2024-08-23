import LogicFlow from '@logicflow/core';
import StartEvent from './start-event';
import EndEvent from './end-event';
import TerminateEndEvent from './terminate-end-event';
import ParallelGateway from './parallel-gateway';
import ExclusiveGateway from './exclusive-gateway';
import InclusiveGateway from './inclusive-gateway';
import UserTask from './user-task';

/**
 * 节点注册工具类
 */
class NodeRegistrar {
  /**
   * 注册全部自定义节点
   * @param lf 流程编辑器对象
   */
  registerAll(lf: LogicFlow) {
    lf.batchRegister([
      StartEvent,
      EndEvent,
      TerminateEndEvent,
      ParallelGateway,
      ExclusiveGateway,
      InclusiveGateway,
      UserTask,
    ]);
  }
}

export const nodeRegistrar = new NodeRegistrar();
