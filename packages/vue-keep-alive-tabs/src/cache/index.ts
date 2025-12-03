import { ref } from "vue";

const include = ref<string[]>([]);

const deleteInclude = (item: string) => {
  include.value = include.value.filter((i) => i !== item);
};

export { include, deleteInclude };
