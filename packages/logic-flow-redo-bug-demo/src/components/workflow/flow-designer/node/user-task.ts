import LogicFlow, { GraphModel, RectNode, RectNodeModel, h } from '@logicflow/core';
import { nanoid } from 'nanoid';
import { NodeType } from '../enum/node-type';
import { nodeViewHelper } from '../helper/node-view-helper';
import { DefaultUserTaskProperties } from './properties/user-task-properties';
import type { UserTaskProperties } from './types';

class UserTaskView extends RectNode {
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
          d: 'm 15,12 c 0.909,-0.845 1.594,-2.049 1.594,-3.385 0,-2.554 -1.805,-4.62199999 -4.357,-4.62199999 -2.55199998,0 -4.28799998,2.06799999 -4.28799998,4.62199999 0,1.348 0.974,2.562 1.89599998,3.405 -0.52899998,0.187 -5.669,2.097 -5.794,4.7560005 v 6.718 h 17 v -6.718 c 0,-2.2980005 -5.5279996,-4.5950005 -6.0509996,-4.7760005 zm -8,6 l 0,5.5 m 11,0 l 0,-5',
          fill: 'none',
          stroke: style.stroke,
          strokeWidth: 1,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
        h('path', {
          d: 'm 15,12 m 2.162,1.009 c 0,2.4470005 -2.158,4.4310005 -4.821,4.4310005 -2.66499998,0 -4.822,-1.981 -4.822,-4.4310005',
          fill: 'none',
          stroke: style.stroke,
          strokeWidth: 1,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
        h('path', {
          d: 'm 15,12 m -6.9,-3.80 c 0,0 2.25099998,-2.358 4.27399998,-1.177 2.024,1.181 4.221,1.537 4.124,0.965 -0.098,-0.57 -0.117,-3.79099999 -4.191,-4.13599999 -3.57499998,0.001 -4.20799998,3.36699999 -4.20699998,4.34799999 z',
          // 头发的填充色和秒变色形同
          fill: style.stroke,
          stroke: style.stroke,
          strokeWidth: 1,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      ],
    );
  }

  getShape(): h.JSX.Element {
    return nodeViewHelper.getTaskShape(this, this.getIcon(), nodeViewHelper.getMultiInstanceTypeIcon(this));
  }
}
class UserTaskModel extends RectNodeModel {
  constructor(data: LogicFlow.NodeConfig<UserTaskProperties>, graphModel: GraphModel) {
    super(data, graphModel);
    this.properties = { ...this.properties, ...new DefaultUserTaskProperties() };
  }

  createId(): string {
    return nanoid();
  }

  setAttributes() {
    this.radius = 10;
  }
}

export default {
  type: NodeType.USER_TASK,
  view: UserTaskView,
  model: UserTaskModel,
};
