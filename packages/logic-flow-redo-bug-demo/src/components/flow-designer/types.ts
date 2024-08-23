import type LogicFlow from '@logicflow/core';
import type { Component } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';

/** 连线数据属性 */
export interface EdgeData<P extends LogicFlow.PropertiesType = LogicFlow.PropertiesType> extends LogicFlow.EdgeData {
  /**  节点自定义属性类型 */
  properties?: P;
}

/** 节点数据 */
export interface NodeData<P extends LogicFlow.PropertiesType = LogicFlow.PropertiesType> extends LogicFlow.NodeData {
  /** 自定义属性 */
  properties?: P;
}

/** 当前编辑中的流程节点/连线数据 */
export type ActiveLogicFlowData = EdgeData | NodeData;

/**
 * 拖动菜单栏元素数据类型
 */
export interface PatternItem<T extends Component = Component> {
  /**
   * 节点类型
   */
  type: string;
  /**
   * 节点名称
   */
  label?: string;
  /** 预览时是否隐藏标签 */
  previewHideLabel?: boolean;
  /**
   * 图标组件
   */
  icon: T;
  /**
   * 图标组件属性
   */
  iconProps?: ComponentProps<T>;
}
