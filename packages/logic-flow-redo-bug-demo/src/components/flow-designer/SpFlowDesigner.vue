<script setup lang="ts">
import LogicFlow, { EventType, Options } from '@logicflow/core';
import { MiniMap, SelectionSelect } from '@logicflow/extension';
import SpFlowDesignerControlPanel from './SpFlowDesignerControlPanel.vue';
import SpFlowDesignerDragMenuPanel from './SpFlowDesignerDragMenuPanel.vue';
import SpFlowDesignerSettingPanel from './SpFlowDesignerSettingPanel.vue';
import { ACTIVE_LOGIC_FLOW_DATA_SYMBOL, LOGIC_FLOW_SYMBOL } from './context';
import style from './theme';
import type { ActiveLogicFlowData, PatternItem } from './types';
import { spDefaultEdgeRegistrar } from './edge';
import type { SpFlowDesignerEdgeType } from './edge/enum/edge-type';
import { getTeleport } from '@logicflow/vue-node-registry';
import '@logicflow/core/es/index.css';
import { nextTick, onMounted, provide, ref } from 'vue';
import SpCard from '../card/SpCard.vue';
import SpContainer from '../layout/SpContainer.vue';

const TeleportContainer = getTeleport();

// LogicFlow 流程是机器容器
defineOptions({
  name: 'SpFlowDesigner',
});

const props = defineProps<{
  /** 默认的边类型，默认值：SpPolylineEdge */
  defaultEdgeType?: SpFlowDesignerEdgeType | Options.EdgeType;
  /** 拖拽生成的元素，拖拽面板中的元素 */
  dragMenuPatternItems?: PatternItem[];
  /** 拖拽菜单一行显示的列数，默认值：2 */
  dragMenuColumn?: number;
  /** 是否增加守卫函数，支持两个函数 beforeClone、beforeDelete，函数返回 true 则执行默认逻辑，返回 false 则阻止。 */
  guards?: Options.GuardsConfig;
}>();

// 当前编辑的节点或边的数据
const activeData = defineModel<ActiveLogicFlowData>('activeData');
/** LogicFlow 操作对象 */
const logicFlow = defineModel<LogicFlow>('logicFlow');

defineSlots<{
  default(): any;
}>();

const emit = defineEmits<{
  /** 完成初始化回调 */
  initialized: [lf: LogicFlow];
}>();

const flowDesignerCanvasRef = ref<HTMLDivElement | null>(null);

// 小地图配置项
const miniMapOptions: MiniMap.MiniMapOption = {
  isShowHeader: false,
  isShowCloseIcon: false,
  showEdge: true,
  width: 200,
  height: 120,
  rightPosition: 10,
  bottomPosition: 10,
};

onMounted(() => {
  const lf = new LogicFlow({
    container: flowDesignerCanvasRef.value!,
    // 小地图、框选
    plugins: [MiniMap, SelectionSelect],
    pluginsOptions: {
      miniMap: miniMapOptions,
    },
    guards: props.guards,
    animation: true,
    background: false,
    nodeTextEdit: true,
    edgeTextEdit: false,
    grid: {
      size: 2,
      visible: false,
    },
    keyboard: {
      enabled: true,
      shortcuts: [
        {
          keys: ['del'],
          callback: () => {
            const elements = lf.getSelectElements(true);
            lf.clearSelectElements();
            elements.edges.forEach(edge => lf.deleteEdge(edge.id!));
            elements.nodes.forEach(node => lf.deleteNode(node.id!));
          },
        },
        {
          keys: ['ctrl + 0'],
          callback: () => {
            lf.resetZoom();
          },
        },
      ],
    },
    style,
  });

  // 节点、边点击事件
  lf.on('node:click,edge:click', ({ data }) => {
    // 如果点击的同一个元素则不做任何操作
    if (activeData.value?.id === data.id) {
      return;
    }
    activeData.value = undefined;
    nextTick(() => {
      activeData.value = data;
    });
  });

  // 点击画布、删除节点时，清除编辑数据
  lf.on('blank:click,node:delete', () => {
    activeData.value = undefined;
  });

  // 画布渲染数据后触发. 即 lf.render(graphData)方法被调用后触发。
  lf.on(EventType.GRAPH_RENDERED, () => {
    // 显示小地图，必须在 lf.render() 后调用。
    (<MiniMap>lf.extension.miniMap).show();
  });
  // 登记自定义默认边，默认为直角折线边，且 id 使用 nanoid 生成
  spDefaultEdgeRegistrar.registerAll(lf, props.defaultEdgeType);
  // 将对象加入响应数据
  logicFlow.value = lf;
  // 触发完成初始化回调
  emit('initialized', lf);
});

// 提供 LogicFlow 对象供子组件使用
provide(LOGIC_FLOW_SYMBOL, logicFlow);
// 提供当前编辑的节点或边数据
provide(ACTIVE_LOGIC_FLOW_DATA_SYMBOL, activeData);
</script>

<template>
  <SpContainer>
    <SpCard title="流程编辑">
      <div class="flow-designer-container">
        <!-- 拖拽面板 -->
        <sp-flow-designer-drag-menu-panel
          :lf="logicFlow"
          :column="dragMenuColumn"
          :pattern-items="dragMenuPatternItems"
        />
        <div class="flow-designer-canvas" ref="flowDesignerCanvasRef"></div>
        <TeleportContainer />
        <!-- 配置面板 -->
        <sp-flow-designer-setting-panel>
          <slot name="default"></slot>
        </sp-flow-designer-setting-panel>
        <!-- 操作面板 -->
        <sp-flow-designer-control-panel :lf="logicFlow" @undo="activeData = undefined" @redo="activeData = undefined" />
      </div>
    </SpCard>
  </SpContainer>
</template>

<style scoped lang="scss">
@use './theme/index.scss' as *;

.flow-designer-container {
  width: 100%;
  height: 100%;
  padding-top: var(--sp-space-wrap-default);
  display: flex;
  position: relative;

  .flow-designer-canvas {
    flex-grow: 1;
    background-image: var($canvasBgImage);
  }

  // 画布样式覆盖
  :deep(.lf-graph) {
    background-color: transparent;

    // 文字框样式
    .lf-text-input {
      color: var(--el-text-color-regular);
      background-color: var(--el-fill-color-light);
      border-color: var(--el-border-color);
    }

    // 小地图样式
    .lf-mini-map {
      padding: 0;
      box-shadow: var(--el-box-shadow-light);
      border: none;
      border-radius: var(--el-border-radius-base);
      background: transparent;
      backdrop-filter: blur(5px);

      .lf-mini-map-header,
      .lf-mini-map-close {
        display: none;
      }
    }

    // 节点
    .lf-node {
      cursor: move;
    }

    // 选区
    .is-selection {
      cursor: crosshair;
    }

    .lf-selection-select {
      border: 1px solid var(--el-color-primary);
      background-color: rgba($color: var(--el-color-primary-rgb), $alpha: 0.1);
      cursor: crosshair;
    }

    .lf-multiple-select {
      border: none;
      background:
        linear-gradient(90deg, var(--el-color-primary) 50%, transparent 0) repeat-x,
        linear-gradient(90deg, var(--el-color-primary) 50%, transparent 0) repeat-x,
        linear-gradient(0deg, var(--el-color-primary) 50%, transparent 0) repeat-y,
        linear-gradient(0deg, var(--el-color-primary) 50%, transparent 0) repeat-y;
      background-size:
        8px 1px,
        8px 1px,
        1px 8px,
        1px 8px;
      background-position:
        0 0,
        0 100%,
        0 0,
        100% 0;
      animation: linearGradientMove 0.6s infinite linear;
      box-shadow: none;
      pointer-events: none;
    }

    @keyframes linearGradientMove {
      100% {
        background-position:
          8px 0,
          -8px 100%,
          0 -8px,
          100% 8px;
      }
    }
  }
}
</style>
