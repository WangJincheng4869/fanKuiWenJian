import LogicFlow, { h, GraphModel, PolygonNode, PolygonNodeModel } from '@logicflow/core';
import { NodeType } from '../enum/node-type';
import { nodeModelHelper } from '../helper/node-model-helper';
import { nodeViewHelper } from '../helper/node-view-helper';
import { nanoid } from 'nanoid';

/**
 * 包容网关（Inclusive Gateway）：是排他网关和并行网关的综合体。当决策时，与排他网关所不同的是，所有条件为true的后继分支都会被执行。
 */
class ExclusiveGatewayView extends PolygonNode {
  /**
   * 内部 X 的图标
   */
  getIcon(): h.JSX.Element {
    // model 中 x,y 表示中心坐标
    const { x, y } = this.props.model;
    return h('circle', {
      cx: x,
      cy: y,
      r: 13,
      fill: 'none',
      stroke: 'var(--sp-flow-designer-node-border-color)',
      strokeWidth: '2',
    });
  }

  getShape(): h.JSX.Element {
    return nodeViewHelper.getGatewayShape(this, this.getIcon());
  }
}

class ExclusiveGatewayModel extends PolygonNodeModel {
  constructor(data: LogicFlow.NodeConfig, graphModel: GraphModel) {
    nodeModelHelper.setNodeTextPosition(data);
    super(data, graphModel);
  }
  setAttributes() {
    nodeModelHelper.setGatewayAttributes(this);
  }
  createId(): string {
    return nanoid();
  }
}

export default {
  type: NodeType.INCLUSIVE_GATEWAY,
  view: ExclusiveGatewayView,
  model: ExclusiveGatewayModel,
};
