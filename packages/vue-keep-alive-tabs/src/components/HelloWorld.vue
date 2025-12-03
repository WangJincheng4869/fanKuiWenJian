<script setup lang="ts">
import { onMounted, ref } from "vue";

const { msg } = defineProps<{ msg: string }>();

const value = ref(0);

onMounted(() => {
  console.log("mounted", msg);
});
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="value" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
