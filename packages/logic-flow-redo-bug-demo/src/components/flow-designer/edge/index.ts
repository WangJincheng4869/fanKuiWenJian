import LogicFlow, { Options } from '@logicflow/core';
import SpPolylineEdge from './sp-polyline-edge';
import SpBezierEdge from './sp-bezier-edge';
import { SpFlowDesignerEdgeType } from './enum/edge-type';

/**
 * 边注册工具类
 */
class SpDefaultEdgeRegistrar {
  /**
   * 注册全部自定义节点
   * @param lf 流程编辑器对象
   * @param defaultType 默认的边类型
   */
  registerAll(
    lf: LogicFlow,
    defaultType: SpFlowDesignerEdgeType | Options.EdgeType = SpFlowDesignerEdgeType.SP_POLYLINE_EDGE,
  ) {
    lf.batchRegister([SpPolylineEdge, SpBezierEdge]);
    // 默认使用直角折线
    lf.setDefaultEdgeType(defaultType);
  }
}

export const spDefaultEdgeRegistrar = new SpDefaultEdgeRegistrar();
