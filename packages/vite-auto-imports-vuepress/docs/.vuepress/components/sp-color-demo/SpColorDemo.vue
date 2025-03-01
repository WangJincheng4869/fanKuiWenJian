<script setup lang="ts">
defineOptions({
  name: 'SpColorDemo',
});
const props = defineProps<{
  color: string;
}>();
</script>

<template>
  <div class="sp-color-demo" :style="{ backgroundColor: props.color }"></div>
</template>

<style scoped lang="scss">
.sp-color-demo {
  width: 100px;
  height: 22px;
  box-shadow: var(--el-box-shadow);
}
</style>
