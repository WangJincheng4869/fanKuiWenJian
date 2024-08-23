import { set } from 'lodash-unified';
import type { ActiveLogicFlowData } from '../../types';
import { ACTIVE_LOGIC_FLOW_DATA_SYMBOL, LOGIC_FLOW_SYMBOL } from '../../context';
import { useInjectRef } from '@/hooks/use-inject';

/**
 * LogicFlow 的操作 hooks
 */
export function useLogicFlow<T extends ActiveLogicFlowData>() {
  // LogicFlow 操作对象
  const lf = useInjectRef(LOGIC_FLOW_SYMBOL);
  // 当前修改的节点/连线对象
  const activeData = useInjectRef<T>(ACTIVE_LOGIC_FLOW_DATA_SYMBOL);

  /**
   * 修改其中一个属性的值（只能在 FlowDesigner 的子组件中使用）
   * @param path 设置值的属性路径
   * @param val 要设置的值
   */
  const setProperty = (path: string, val: any) => {
    if (!lf.value) {
      console.warn(`useLogicFlow.setProperty - LogicFlow 对象为空`);
      return;
    }
    if (!activeData.value) {
      console.warn(`useLogicFlow.setProperty - activeData 对象为空`);
      return;
    }
    if (!activeData.value.id) {
      console.warn(`useLogicFlow.setProperty - activeData 对象 id 为空`);
      return;
    }
    if (!activeData.value.properties) {
      activeData.value.properties = {};
    }
    set(activeData.value.properties, path, val);
    lf.value?.setProperties(activeData.value.id, activeData.value.properties);
  };

  return {
    lf,
    activeData,
    setProperty,
  };
}
