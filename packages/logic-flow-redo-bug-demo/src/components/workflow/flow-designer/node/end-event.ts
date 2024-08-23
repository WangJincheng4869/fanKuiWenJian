import { CircleNode, CircleNodeModel, GraphModel } from '@logicflow/core';
import { NodeType } from '../enum/node-type';
import { nodeModelHelper } from '../helper/node-model-helper';
import { nanoid } from 'nanoid';

class EndEventView extends CircleNode {}
class EndEventModel extends CircleNodeModel {
  constructor(data: any, graphModel: GraphModel) {
    nodeModelHelper.setNodeTextPosition(data);
    super(data, graphModel);
  }
  setAttributes() {
    nodeModelHelper.setEndEventAttributes(this);
  }

  createId(): string {
    return nanoid();
  }
}

/**
 * 结束事件节点
 */
export default {
  type: NodeType.END_EVENT,
  view: EndEventView,
  model: EndEventModel,
};
