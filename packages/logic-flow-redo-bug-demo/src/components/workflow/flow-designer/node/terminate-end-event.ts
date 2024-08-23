import LogicFlow, { CircleNode, CircleNodeModel, GraphModel, h } from '@logicflow/core';
import { NodeType } from '../enum/node-type';
import { nodeModelHelper } from '../helper/node-model-helper';
import { nodeViewHelper } from '../helper/node-view-helper';
import { nanoid } from 'nanoid';

/**
 * 终止结束事件（Terminate End Event）：表示流程被强制终止，什么都不做。当流程有多个分支路线被激活时，这些分支上的活动任务也被终止。
 */
class TerminateEndEventView extends CircleNode {
  /**
   * 内部 + 图标
   */
  getIcon(): h.JSX.Element {
    const { x, y } = this.props.model;
    const style = this.props.model.getNodeStyle();
    return h(
      'svg',
      {
        // model中x,y表示中心坐标，而svg x,y表示左上角，这里的 25 是实心圆高度的一半
        x: x - 25,
        y: y - 25,
        viewBox: '0 0 1024 1024',
        width: 50,
        height: 50,
      },
      [
        h('path', {
          d: 'M512 212.3A299.7 299.7 0 1 0 811.7 512 299.7 299.7 0 0 0 512 212.3z',
          fill: style.stroke,
        }),
      ],
    );
  }
  getShape(): h.JSX.Element {
    return nodeViewHelper.getCircleShape(this, this.getIcon());
  }
}
class TerminateEndEventModel extends CircleNodeModel {
  constructor(data: LogicFlow.NodeConfig, graphModel: GraphModel) {
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

export default {
  type: NodeType.TERMINATE_END_EVENT,
  view: TerminateEndEventView,
  model: TerminateEndEventModel,
};
