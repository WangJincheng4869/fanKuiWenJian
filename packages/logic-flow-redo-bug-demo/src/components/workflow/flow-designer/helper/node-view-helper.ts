import { CircleNode, PolygonNode, RectNode, h } from '@logicflow/core';
import type { MultiInstanceType, UserTaskProperties } from '../node/types';

type ComponentChildren = Parameters<typeof h>[2];

/**
 * 节点视图工具
 */
class NodeViewHelper {
  /**
   * 在圆形节点上添加图像
   * @param node 要自定义的节点对象
   * @param children 要添加的图像
   * @returns
   */
  getCircleShape(node: CircleNode, ...children: ComponentChildren[]): h.JSX.Element {
    const { x, y, r } = node.props.model;
    const style = node.props.model.getNodeStyle();
    return h('g', {}, [
      h('circle', {
        ...style,
        cx: x,
        cy: y,
        r,
      }),
      children,
    ]);
  }

  /**
   * 在网关图形内部添加图像
   * @param node 要自定义的节点对象
   * @param children 要添加的图像
   * @returns
   */
  getGatewayShape(node: PolygonNode, ...children: ComponentChildren[]): h.JSX.Element {
    const { x, y, points } = node.props.model;
    const style = node.props.model.getNodeStyle();
    // x，y默认是中心点，要根据四个点的位置去计算真实的四个点位置
    const pointStr = points
      .map((point: number[], i: number) => {
        if (i === 0) {
          return `${x}, ${y - point[0]}`;
        }
        if (i === 1) {
          return `${x + point[1]}, ${y}`;
        }
        if (i === 2) {
          return `${x}, ${y + point[0]}`;
        }
        return `${x - point[1]}, ${y}`;
      })
      .join(' ');
    return h('g', {}, [
      h('polygon', {
        ...style,
        points: pointStr,
      }),
      children,
    ]);
  }

  /**
   * 在任务图形内部添加图像
   * @param node 要自定义的节点对象
   * @param children 要添加的图像
   * @returns
   */
  getTaskShape(node: RectNode, ...children: ComponentChildren[]): h.JSX.Element {
    const { x, y, width, height, radius } = node.props.model;
    const style = node.props.model.getNodeStyle();
    return h('g', {}, [
      h('rect', {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        rx: radius,
        ry: radius,
        width,
        height,
      }),
      children,
    ]);
  }

  /**
   * 多实例循环特性类型图标
   * @param node 要自定义的节点对象
   * @returns
   */
  getMultiInstanceTypeIcon(node: RectNode): h.JSX.Element | undefined {
    const { x, y, height, properties } = node.props.model;
    const style = node.props.model.getNodeStyle();
    let d = '';
    const multiInstanceType: MultiInstanceType | undefined = (<UserTaskProperties>properties).taskInstance.type;
    if (multiInstanceType === 'parallel') {
      d = 'm2,0 m 3,2 l 0,10 m 3,-10 l 0,10 m 3,-10 l 0,10';
    } else if (multiInstanceType === 'sequential') {
      d = 'm3,1 m 0,3 l 10,0 m -10,3 l 10,0 m -10,3 l 10,0';
    } else {
      return;
    }
    return h(
      'svg',
      {
        // model中x,y表示中心坐标，而svg x,y表示左上角
        x: x - 8,
        y: y + height / 2 - 20,
        viewBox: '0 0 15 15',
        width: 15,
        height: 15,
      },
      [
        h('path', {
          d,
          fill: 'none',
          stroke: style.stroke,
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      ],
    );
  }
}

export const nodeViewHelper = new NodeViewHelper();
