import type { InjectionKey, Ref } from 'vue';
import type { Button } from '../../node/types';

/** 当前正在编辑中的全部按钮 */
export const EDITING_BUTTONS: InjectionKey<Ref<Button[]>> = Symbol('EditingButtons');
