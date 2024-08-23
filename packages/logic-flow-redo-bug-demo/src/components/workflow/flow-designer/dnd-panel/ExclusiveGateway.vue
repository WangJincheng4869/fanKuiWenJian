<script setup lang="ts">
// 排他网关（Exclusive Gateway）：定义了一组分支的唯一决策，所有流出的分支被顺序评估，第一个条件被评估为true的分支被执行，并不再继续评估下面的分支
defineOptions({
  name: 'ExclusiveGateway',
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
    <path
      d="m 16,15 7.42857142857143,9.714285714285715 -7.42857142857143,9.714285714285715 3.428571428571429,0 5.714285714285715,-7.464228571428572 5.714285714285715,7.464228571428572 3.428571428571429,0 -7.42857142857143,-9.714285714285715 7.42857142857143,-9.714285714285715 -3.428571428571429,0 -5.714285714285715,7.464228571428572 -5.714285714285715,-7.464228571428572 -3.428571428571429,0 z"
    ></path>
  </svg>
</template>

<style scoped lang="scss"></style>
