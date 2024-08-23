<script setup lang="ts">
// 包容网关（Inclusive Gateway）：是排他网关和并行网关的综合体。当决策时，与排他网关所不同的是，所有条件为true的后继分支都会被执行。
defineOptions({
  name: 'InclusiveGateway',
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
    <circle
      cx="25"
      cy="25"
      r="13"
      fill="none"
      stroke="var(--sp-flow-designer-node-border-color)"
      stroke-width="2"
    ></circle>
  </svg>
</template>

<style scoped lang="scss"></style>
