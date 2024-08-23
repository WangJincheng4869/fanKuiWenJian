import { NodeType } from '../enum/node-type';
import type { Button } from '../node/types';
import { cloneDeep } from 'lodash-unified';


type NodeTypeItemType = {
  type: string;
  label: string;
};

/** 全部结束节点类型 */
const endEventTypeItems: readonly NodeTypeItemType[] = [
  {
    type: NodeType.END_EVENT,
    label: '结束事件',
  },
  {
    type: NodeType.TERMINATE_END_EVENT,
    label: '结束终止事件',
  },
];

/** 全部网关节点类型 */
const gatewayTypeItems: readonly NodeTypeItemType[] = [
  {
    type: NodeType.PARALLEL_GATEWAY,
    label: '并行网关',
  },
  {
    type: NodeType.EXCLUSIVE_GATEWAY,
    label: '排他网关',
  },
  {
    type: NodeType.INCLUSIVE_GATEWAY,
    label: '包容网关',
  },
];

/** 全部节点/连线类型 Map，内部使用节点类型存储可选的节点类型选项 */
const typeOptionMap = new Map<string, ReadonlyArray<NodeTypeItemType>>([
  [NodeType.END_EVENT, endEventTypeItems],
  [NodeType.TERMINATE_END_EVENT, endEventTypeItems],
  [NodeType.PARALLEL_GATEWAY, gatewayTypeItems],
  [NodeType.EXCLUSIVE_GATEWAY, gatewayTypeItems],
  [NodeType.INCLUSIVE_GATEWAY, gatewayTypeItems],
]);

/** 节点默认名称，使用节点类型存储 */
const defaultNameMap = new Map<string, string>([
  [NodeType.END_EVENT, '结束事件'],
  [NodeType.TERMINATE_END_EVENT, '结束终止事件'],
  [NodeType.PARALLEL_GATEWAY, '并行网关'],
  [NodeType.EXCLUSIVE_GATEWAY, '排他网关'],
  [NodeType.INCLUSIVE_GATEWAY, '包容网关'],
]);

/** 默认全部的按钮数据 */
const buttons: Button[] = [
  {
    type: 'save',
    enabled: true,
    actions: [],
  },
  {
    type: 'complete',
    enabled: true,
    actions: [],
  },
  {
    type: 'back',
    enabled: true,
    actions: [],
  },
  {
    type: 'transfer',
    enabled: true,
    actions: [],
  },
  {
    type: 'delegate',
    enabled: true,
    actions: [],
  },
  {
    type: 'revoke',
    enabled: true,
    actions: [],
  },
];


export { typeOptionMap, defaultNameMap };
