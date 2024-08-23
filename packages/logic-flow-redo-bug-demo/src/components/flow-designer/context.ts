import type LogicFlow from '@logicflow/core';
import type { InjectionKey, Ref } from 'vue';

/** 流程设计器对象 */
export const LOGIC_FLOW_SYMBOL: InjectionKey<Ref<LogicFlow | undefined>> = Symbol('LogicFlow');
/** 当前编辑中的流程节点/连线数据 */
export const ACTIVE_LOGIC_FLOW_DATA_SYMBOL: InjectionKey<Ref<LogicFlow.NodeConfig | LogicFlow.EdgeConfig | undefined>> =
  Symbol('ActiveLogicFlowData');
