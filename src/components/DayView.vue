<template>
  <div v-if="isUnlocked" class="day"> 
    <h2>День №{{ dayNumber }}</h2>
    <p>{{ note }}</p>
    <button v-if="!showTask" @click="showTask = true">Відкрити завдання</button>
    <div v-else>
      <h3>Завдання:</h3>
      <p >{{ task }}</p>
    </div>
  </div>
  <TaskBlocker v-else :unlockedDay="unlockedDay" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import notes from '../data/notes';
import tasks from '../data/tasks';
import TaskBlocker from './TaskBlocker.vue';

const route = useRoute();
const dayNumber = Number(route.path.split('/').pop());
const unlockedDay = ref(Number(localStorage.getItem('unlockedDay') || 1));
const isUnlocked = computed(() => dayNumber <= unlockedDay.value);
const note = notes[dayNumber - 1];
const task = tasks[dayNumber - 1];
const showTask = ref(false);

onMounted(() => {
  if (dayNumber === unlockedDay.value) {
    localStorage.setItem('unlockedDay', dayNumber + 1);
  }
});
</script>

<style scoped>
.day {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  text-align: center;
}
h2 {
  margin-bottom: 0.5rem;
}
p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #555;
}
</style>
