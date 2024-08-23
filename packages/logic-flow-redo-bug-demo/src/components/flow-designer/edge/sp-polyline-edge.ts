import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core';
import { nanoid } from 'nanoid';
import { SpFlowDesignerEdgeType } from './enum/edge-type';

/**
 * 自定义直角折线边
 */
class SpPolylineEdgeModel extends PolylineEdgeModel {
  createId(): string {
    return nanoid();
  }
}

export default {
  type: SpFlowDesignerEdgeType.SP_POLYLINE_EDGE,
  view: PolylineEdge,
  model: SpPolylineEdgeModel,
};
