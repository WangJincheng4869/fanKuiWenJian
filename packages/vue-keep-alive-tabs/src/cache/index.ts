import { ref } from "vue";

const include = ref<string[]>([]);

const deleteInclude = (item: string) => {
  // 这里如果改成删除元素，那么会报错 App.vue:42 [Vue warn]: Unhandled error during execution of component update
  include.value = include.value.filter((i) => i !== item);
};

export { include, deleteInclude };
