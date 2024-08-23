import LogicFlow, { CircleNode, CircleNodeModel, GraphModel } from '@logicflow/core';
import { NodeType } from '../enum/node-type';
import { nodeModelHelper } from '../helper/node-model-helper';
import { nanoid } from 'nanoid';

class StartEventView extends CircleNode {}
class StartEventModel extends CircleNodeModel {
  constructor(data: LogicFlow.NodeConfig, graphModel: GraphModel) {
    nodeModelHelper.setNodeTextPosition(data);
    super(data, graphModel);
  }
  setAttributes() {
    nodeModelHelper.setStartEventAttributes(this);
  }

  createId(): string {
    return nanoid();
  }
}

/**
 * 开始事件节点
 */
export default {
  type: NodeType.START_EVENT,
  view: StartEventView,
  model: StartEventModel,
};
