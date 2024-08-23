import type { CircleNodeModel, LogicFlow, PolygonNodeModel } from '@logicflow/core';

/**
 * 节点模型工具类，自定义节点时会使用
 * @link https://site.logic-flow.cn/docs/#/zh/api/nodeModelApi
 */
class NodeModelHelper {
  /**
   * 设置节点文本的坐标
   * @param data 节点数据
   */
  setNodeTextPosition(data: LogicFlow.NodeConfig) {
    if (!data.text) {
      data.text = '';
    }
    if (typeof data.text === 'string') {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y + 38,
      };
    }
  }

  /**
   * 开始事件节点基础属性设置，设置原始图形的一些通用的基础信息。所有的开始事件都是相同的形状，内部不同的元素代表不同类型
   * @param model NodeModel
   */
  setStartEventAttributes(model: CircleNodeModel) {
    model.r = 20;
  }

  /**
   * 结束事件节点基础属性设置，设置原始图形的一些通用的基础信息。所有的结束事件都是相同的形状，内部不同的元素代表不同类型
   * @param model NodeModel
   */
  setEndEventAttributes(model: CircleNodeModel) {
    model.r = 20;
    model.style.strokeWidth = 4;
  }

  /**
   * 网关节点基础属性设置，设置原始图形的一些通用的基础信息。所有的网关都是相同的形状，内部不同的元素代表不同类型
   * @param model NodeModel
   */
  setGatewayAttributes(model: PolygonNodeModel) {
    model.points = [
      [25, 0],
      [50, 25],
      [25, 50],
      [0, 25],
    ];
    model.style.strokeLinecap = 'round';
    model.style.strokeLinejoin = 'round';
  }
}
export const nodeModelHelper = new NodeModelHelper();
