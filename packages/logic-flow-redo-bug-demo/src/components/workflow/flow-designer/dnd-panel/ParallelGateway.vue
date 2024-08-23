<script setup lang="ts">
// 并行网关（Parallel Gateway）： 用于并行执行多个分支，所有分支都会被执行。
defineOptions({
  name: 'ParallelGateway',
});
</script>

<template>
  <svg viewBox="-1 -1 52 52" version="1.1" xmlns="http://www.w3.org/2000/svg" width="45" height="45">
    <polygon
      points="25,0 50,25 25,50 0,25"
      fill="none"
      stroke="var(--sp-flow-designer-node-border-color)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></polygon>
    <path d="m 22.5,10 0,12.5 -12.5,0 0,5 12.5,0 0,12.5 5,0 0,-12.5 12.5,0 0,-5 -12.5,0 0,-12.5 -5,0 z"></path>
  </svg>
</template>

<style scoped lang="scss"></style>
