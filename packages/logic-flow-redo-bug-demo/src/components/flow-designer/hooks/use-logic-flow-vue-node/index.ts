import type { BaseNodeModel, GraphModel } from '@logicflow/core';
import { inject } from 'vue';

/** LogicFlow VUE 节点工具类 */
export function useLogicFlowVueNode() {
  const node = inject<() => BaseNodeModel>('getNode')?.();
  const graph = inject<() => GraphModel>('getGraph')?.();

  return { node, graph };
}
