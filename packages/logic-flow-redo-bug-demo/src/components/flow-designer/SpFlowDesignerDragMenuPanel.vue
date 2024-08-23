<script setup lang="ts">
import LogicFlow from '@logicflow/core';
import { type PatternItem } from './types';
import { shallowReactive } from 'vue';

// 拖拽面板
defineOptions({
  name: 'SpFlowDesignerDragMenuPanel',
});

const props = withDefaults(
  defineProps<{
    /** LogicFlow 对象 */
    lf?: LogicFlow;
    /** 拖拽生成的元素 */
    patternItems?: PatternItem[];
    /** 一行显示的列数，默认值：2 */
    column?: number;
  }>(),
  {
    column: 2,
  },
);

// 预览面板缓存数据，用于显示预览的图标
const previewPanel = shallowReactive<{
  dragging: boolean;
  visible: boolean;
  top: number;
  data?: PatternItem;
}>({
  dragging: false,
  visible: false,
  top: 0,
  data: undefined,
});

/**
 * 拖拽创建节点
 * @param item 接单数据
 */
const startDrag = (item: PatternItem) => {
  // 开始拖拽是隐藏预览面板
  previewPanel.visible = false;
  previewPanel.dragging = true;
  props.lf?.dnd.startDrag({
    type: item.type,
    text: item.label,
  });
};

/**
 * 鼠标进入拖动节点处理
 * @param item 节点数据
 */
const mouseenterNode = (item: PatternItem, e: MouseEvent) => {
  // 当处于拖拽中设置状态
  if (previewPanel.dragging) {
    return;
  }
  // 预览节点数据
  previewPanel.data = item;
  // 打开节点面板
  previewPanel.visible = true;
  previewPanel.top = (<HTMLDivElement>e.target).offsetTop;
};

const hidePreviewPanel = () => {
  // 鼠标移出记录当前 type 值
  let type = previewPanel.data?.type;
  setTimeout(() => {
    // 如果 30 毫秒后依旧是当前值，则代表是移出了元素，否则就是在元素之间切换
    if (type === previewPanel.data?.type) {
      previewPanel.visible = false;
    }
  }, 30);
};
</script>

<template>
  <div class="node-menu">
    <div class="node-menu-items" @mouseup="previewPanel.dragging = false" @mouseleave="previewPanel.dragging = false">
      <div
        v-for="item in patternItems"
        :key="item.type"
        class="node-menu-item"
        @mouseenter="mouseenterNode(item, $event)"
        @mouseleave="hidePreviewPanel"
        @mousedown="startDrag(item)"
      >
        <component :is="item.icon" v-bind="item.iconProps" />
      </div>
      <transition name="el-fade-in-linear">
        <div
          v-show="previewPanel.visible"
          class="preview-panel el-popover el-popper"
          :style="{ top: `${previewPanel.top}px` }"
        >
          <component :is="previewPanel.data?.icon" v-bind="previewPanel.data?.iconProps" />
          <div class="mt-2" v-if="previewPanel.data?.label && !previewPanel.data?.previewHideLabel">
            {{ previewPanel.data?.label }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.node-menu {
  height: 100%;
  padding-right: 10px;
  position: relative;

  .preview-panel {
    position: absolute;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    left: 100%;
    transition: all var(--el-transition-duration-fast) linear;
  }

  .node-menu-items {
    display: grid;
    grid-template-columns: repeat(v-bind(column), 1fr);
  }

  .node-menu-item {
    padding: 6px;
    line-height: 1;
    cursor: move;
    transition: background-color 0.25s ease;
    border-radius: var(--el-border-radius-base);
    outline: none;
    user-select: none;

    // 拖拽菜单图标的大小
    :deep(svg) {
      outline: none;
    }

    &:hover {
      background-color: var(--el-fill-color-light);
    }
  }

  // 拖动菜单的图标颜色，这个颜色包含预览窗格
  :deep(svg) {
    fill: var(--sp-flow-designer-node-border-color);
  }
}
</style>
