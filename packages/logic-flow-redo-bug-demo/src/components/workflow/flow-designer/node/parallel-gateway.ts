import LogicFlow, { h, GraphModel, PolygonNode, PolygonNodeModel } from '@logicflow/core';
import { NodeType } from '../enum/node-type';
import { nodeModelHelper } from '../helper/node-model-helper';
import { nodeViewHelper } from '../helper/node-view-helper';
import { nanoid } from 'nanoid';

/**
 * 并行网关（Parallel Gateway）
 * 用于并行执行多个分支，所有分支都会被执行。 并行网关用于无条件的拆分或合并分支，该类网关对连线条件是忽略的。并行网关有分支和合并两种行为，允许多进多出。
 */
class ParallelGatewayView extends PolygonNode {
  /**
   * 内部实心圆的图标
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
          d: 'm 22.5,10 0,12.5 -12.5,0 0,5 12.5,0 0,12.5 5,0 0,-12.5 12.5,0 0,-5 -12.5,0 0,-12.5 -5,0 z',
          fill: style.stroke,
        }),
      ],
    );
  }

  getShape(): h.JSX.Element {
    return nodeViewHelper.getGatewayShape(this, this.getIcon());
  }
}

class ParallelGatewayModel extends PolygonNodeModel {
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
  type: NodeType.PARALLEL_GATEWAY,
  view: ParallelGatewayView,
  model: ParallelGatewayModel,
};
