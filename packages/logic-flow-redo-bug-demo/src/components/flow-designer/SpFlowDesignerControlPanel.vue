<script setup lang="ts">
import SpControlPanel from '@/components/navigation/sp-control-panel/SpControlPanel.vue';
import SpControlPanelItem from '@/components/navigation/sp-control-panel/SpControlPanelItem.vue';
import LogicFlow from '@logicflow/core';
import { onMounted, ref } from 'vue';

// 操作面板
defineOptions({
  name: 'SpFlowDesignerControlPanel',
});

const props = defineProps<{
  /** LogicFlow 对象 */
  lf?: LogicFlow;
}>();

const emits = defineEmits<{
  /** 撤销事件 */
  undo: [];
  /** 重做事件 */
  redo: [];
}>();

// 当前是否在选择中
const selecting = ref(false);
const undoAble = ref(false);
const redoAble = ref(false);
// 画布元素
const lfCanvasElement = ref<Element | null>();

/**
 * 开启选区功能
 */
const openSelection = () => {
  props.lf?.openSelectionSelect();
  selecting.value = true;
  // 改变画布鼠标样式
  lfCanvasElement.value?.classList.add('is-selection');
  props.lf?.once('selection:selected', closeSelection);
};

/**
 * 关闭选区功能
 */
const closeSelection = () => {
  props.lf?.closeSelectionSelect();
  selecting.value = false;
  // 恢复画布鼠标样式
  lfCanvasElement.value?.classList.remove('is-selection');
};

onMounted(() => {
  // 监听 undo redo 状态，之所以使用定时器是因为画布创建后才会生成 lf 对象
  const timer = setInterval(() => {
    if (!props.lf) {
      return;
    }
    // 获取画布
    lfCanvasElement.value = document.querySelector('.lf-canvas-overlay');
    // 监听 undo redo 状态
    props.lf?.on('history:change', ({ data }: { data: { undoAble: boolean; redoAble: boolean } }) => {
      undoAble.value = data.undoAble;
      redoAble.value = data.redoAble;
    });
    // Alt 键按下开启选区功能
    props.lf?.container.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.altKey && !selecting.value) {
        openSelection();
        e.preventDefault();
      }
    });
    // Alt 键松开结束选区功能
    props.lf?.container.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'Alt') closeSelection();
    });
    // 浏览器非激活状态关闭选区功能
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        closeSelection();
      }
    });
    clearInterval(timer);
  }, 300);
});

/**
 * 撤销
 */
const undo = () => {
  props.lf?.undo();
  emits('undo');
};

/**
 * 重做
 */
const redo = () => {
  props.lf?.redo();
  emits('redo');
};
</script>

<template>
  <sp-control-panel class="control-panel" :blur-enabled="true">
    <el-tooltip content="开启：按下 Alt；关闭：抬起 Alt" :enterable="false" :show-after="800">
      <sp-control-panel-item @click="openSelection" :active="selecting" icon="selection" name="选区" />
    </el-tooltip>
    <el-tooltip content="Ctrl + 鼠标滚轮上" :enterable="false" :show-after="800">
      <sp-control-panel-item @click="lf?.zoom(true)" icon="zoom-in" name="放大" />
    </el-tooltip>
    <el-tooltip content="Ctrl + 鼠标滚轮下" :enterable="false" :show-after="800">
      <sp-control-panel-item @click="lf?.zoom(false)" icon="zoom-out" name="缩小" />
    </el-tooltip>
    <el-tooltip content="Ctrl + 0" :enterable="false" :show-after="800">
      <sp-control-panel-item @click="lf?.resetZoom()" icon="zoom-reset" name="适应" />
    </el-tooltip>
    <el-tooltip content="Ctrl + Z" :enterable="false" :show-after="800">
      <sp-control-panel-item @click="undo" icon="undo" :disabled="!undoAble" name="撤销" />
    </el-tooltip>
    <el-tooltip content="Ctrl + Y" :enterable="false" :show-after="800">
      <sp-control-panel-item @click="redo" icon="redo" :disabled="!redoAble" name="重做" />
    </el-tooltip>
  </sp-control-panel>
</template>

<style scoped lang="scss">
.control-panel {
  position: absolute;
  top: calc(var(--sp-space-wrap-default) + 5px);
  left: 50%;
  transform: translateX(-50%);
}
</style>
