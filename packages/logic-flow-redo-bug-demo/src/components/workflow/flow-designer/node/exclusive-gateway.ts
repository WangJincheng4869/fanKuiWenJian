import LogicFlow, { h, GraphModel, PolygonNode, PolygonNodeModel } from '@logicflow/core';
import { NodeType } from '../enum/node-type';
import { nodeModelHelper } from '../helper/node-model-helper';
import { nodeViewHelper } from '../helper/node-view-helper';
import { nanoid } from 'nanoid';

/**
 * 排他网关（Exclusive Gateway）： 用于在多个路径中做出排他性的选择，只选择一个分支。
 */
class ExclusiveGatewayView extends PolygonNode {
  /**
   * 内部 X 的图标
   */
  getIcon(): h.JSX.Element {
    const { x, y, width, height } = this.props.model;
    const style = this.props.model.getNodeStyle();
    return h(
      'svg',
      {
        // model中x,y表示中心坐标，而svg x,y表示左上角
        x: x - width / 2,
        y: y - height / 2,
        viewBox: '0 0 50 50',
        width: 50,
        height: 50,
      },
      [
        h('path', {
          d: 'm 16,15 7.42857142857143,9.714285714285715 -7.42857142857143,9.714285714285715 3.428571428571429,0 5.714285714285715,-7.464228571428572 5.714285714285715,7.464228571428572 3.428571428571429,0 -7.42857142857143,-9.714285714285715 7.42857142857143,-9.714285714285715 -3.428571428571429,0 -5.714285714285715,7.464228571428572 -5.714285714285715,-7.464228571428572 -3.428571428571429,0 z',
          fill: style.stroke,
        }),
      ],
    );
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
  type: NodeType.EXCLUSIVE_GATEWAY,
  view: ExclusiveGatewayView,
  model: ExclusiveGatewayModel,
};
