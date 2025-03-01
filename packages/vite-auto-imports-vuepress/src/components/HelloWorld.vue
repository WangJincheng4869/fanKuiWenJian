<script setup lang="ts">
defineProps<{
  msg: string;
}>();

const str = ref("www.domain.com");
const remove = ref(".com");

const clickHandler = () => {
  str.value = stringUtils.removeEnd(str.value, remove.value);
};
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <label>
      请输入要截取字符结尾内容：
      <input v-model="remove" />
    </label>
    <button @click="clickHandler">请点击这个按钮</button>

    <h3>结果：{{ str }}</h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
