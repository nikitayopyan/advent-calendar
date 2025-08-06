<template>
  <div class="blocker">
    <h2 class="bold">Упс, для цього дня ще рано!</h2>
    <p>Відкрий спочатку день №{{ unlockedDay }} 😊</p>
  </div>
</template>

<script setup>
const props = defineProps({ unlockedDay: Number });
</script>

<style scoped>
.blocker {
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>
