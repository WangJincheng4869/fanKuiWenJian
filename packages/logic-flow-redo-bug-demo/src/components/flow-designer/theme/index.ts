import type LogicFlow from '@logicflow/core';

export default {
  nodeText: {
    fontSize: 12,
    color: 'var(--el-text-color-regular)',
  },
  text: {
    fontSize: 12,
    color: 'var(--el-text-color-regular)',
  },
  baseNode: {
    // 节点边框颜色
    stroke: 'var(--sp-flow-designer-node-border-color)',
    // 节点填充色
    fill: 'var(--sp-bg-color-overlay)',
  },
  anchorLine: {
    // 连线颜色与边框一致
    stroke: 'var(--sp-flow-designer-node-border-color)',
  },
  baseEdge: {
    // 连线颜色与边框一致
    stroke: 'var(--sp-flow-designer-node-border-color)',
  },
  edgeText: {
    fontSize: 12,
    color: 'var(--el-text-color-regular)',
    background: {
      fill: 'transparent',
    },
  },
  anchor: {
    // 锚点填充色是节点填充色
    fill: 'var(--sp-bg-color-overlay)',
    // 锚点边框颜色是节点边框颜色
    stroke: 'var(--sp-flow-designer-node-border-color)',
  },
  edgeAnimation: {},
} as Partial<LogicFlow.Theme>;
