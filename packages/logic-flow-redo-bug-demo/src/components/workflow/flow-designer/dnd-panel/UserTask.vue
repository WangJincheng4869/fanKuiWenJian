<script setup lang="ts">
// 用户任务（User Task）：代表需要人类干预或参与的任务。这通常涉及到手动操作，例如填写表单、审核文件等。用户任务是流程中的一环，直到某个用户完成任务后，流程才能继续。
defineOptions({
  name: 'UserTask',
});
</script>

<template>
  <svg viewBox="0 0 62 52" version="1.1" xmlns="http://www.w3.org/2000/svg" width="45" height="45">
    <rect
      x="1"
      y="1"
      width="60"
      height="50"
      rx="5"
      ry="5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      stroke-width="2"
      stroke="var(--sp-flow-designer-node-border-color)"
    ></rect>
    <path
      d="m 15,12 c 0.909,-0.845 1.594,-2.049 1.594,-3.385 0,-2.554 -1.805,-4.62199999 -4.357,-4.62199999 -2.55199998,0 -4.28799998,2.06799999 -4.28799998,4.62199999 0,1.348 0.974,2.562 1.89599998,3.405 -0.52899998,0.187 -5.669,2.097 -5.794,4.7560005 v 6.718 h 17 v -6.718 c 0,-2.2980005 -5.5279996,-4.5950005 -6.0509996,-4.7760005 zm -8,6 l 0,5.5 m 11,0 l 0,-5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      stroke="var(--sp-flow-designer-node-border-color)"
      stroke-width="1"
    ></path>
    <path
      d="m 15,12 m 2.162,1.009 c 0,2.4470005 -2.158,4.4310005 -4.821,4.4310005 -2.66499998,0 -4.822,-1.981 -4.822,-4.4310005 "
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      stroke="var(--sp-flow-designer-node-border-color)"
      stroke-width="1"
    ></path>
    <path
      d="m 15,12 m -6.9,-3.80 c 0,0 2.25099998,-2.358 4.27399998,-1.177 2.024,1.181 4.221,1.537 4.124,0.965 -0.098,-0.57 -0.117,-3.79099999 -4.191,-4.13599999 -3.57499998,0.001 -4.20799998,3.36699999 -4.20699998,4.34799999 z"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1"
      stroke="var(--sp-flow-designer-node-border-color)"
    ></path>
  </svg>
</template>

<style scoped lang="scss"></style>
