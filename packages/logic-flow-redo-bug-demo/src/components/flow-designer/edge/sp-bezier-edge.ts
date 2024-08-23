import { BezierEdge, BezierEdgeModel } from '@logicflow/core';
import { nanoid } from 'nanoid';
import { SpFlowDesignerEdgeType } from './enum/edge-type';

/**
 * 自定义贝塞尔曲线边
 */
class SpBezierEdgeModel extends BezierEdgeModel {
  createId(): string {
    return nanoid();
  }
}

export default {
  type: SpFlowDesignerEdgeType.SP_BEZIER_EDGE,
  view: BezierEdge,
  model: SpBezierEdgeModel,
};
