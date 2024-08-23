export interface SpOutlineProps {
  /**
   * 标题名
   * @default 本页目录
   */
  title?: string;
  /**
   * 要抓取的跟元素，可以直接传入元素对象，或者一个选择器
   */
  el: HTMLElement | string;

  /**
   * 锚点选择器，要抓取哪些节点。只有标题（<h1>–<h6>）可以体现层级，最多可以体现两级
   * @default h2,h3
   */
  anchorSelectors?: string;
  /**
   * 组件宽度
   * @default 100%
   */
  width?: string;
  /**
   * 组件高度
   * @default 100%
   */
  height?: string;
}
