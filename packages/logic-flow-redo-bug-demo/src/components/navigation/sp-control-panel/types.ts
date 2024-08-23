import { type } from 'os';
import SpControlPanel from './SpControlPanel.vue';
import SpControlPanelItem from './SpControlPanelItem.vue';
import type { SpIconName } from '@/components/sp-icon/types';

/**
 * 操作面板实例
 */
export type SpControlPanelnstance = InstanceType<typeof SpControlPanel>;

/**
 * 操作面板项实例
 */
export type SpControlPanelItemInstance = InstanceType<typeof SpControlPanelItem>;

/**
 * 操作面板选项
 */
export interface SpControlPanelProps {
  /**
   * 是否启用模糊特效
   */
  blurEnabled?: boolean;
  /**
   * 布局方向，垂直布局或者水平布局
   */
  direction?: 'row' | 'column';
}
/**
 * 操作面板项选项
 */
export interface SpControlPanelItemProps {
  /**
   * 图标名
   */
  icon?: SpIconName;
  /**
   * 名称
   */
  name?: string;
  /**
   * 是否禁用按钮
   */
  disabled?: boolean;
  /**
   * 是否为激活状态
   */
  active?: boolean;
}
