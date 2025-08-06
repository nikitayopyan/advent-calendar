<template>
  <div v-if="isUnlocked" class="day"> 
    <h2 class="bold">День №{{ dayNumber }}</h2>
    <p>{{ note }}</p>
    <button v-if="!showTask" @click="showTask = true">Відкрий завдання</button>
    <div v-else>
      <h3 class="bold">Завдання:</h3>
      <p>{{ task }}</p>
    </div>
  </div>
  <TaskBlocker v-else :unlockedDay="currentUnlockedDay" />
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import notes from '../data/notes';
import tasks from '../data/tasks';
import TaskBlocker from './TaskBlocker.vue';

const route = useRoute();

const showTask = ref(false);
const currentUnlockedDay = ref(Number(localStorage.getItem('unlockedDay') || 1));
const dayNumber = ref(Number(route.path.split('/').pop()));

watch(
  () => route.path,
  (newVal) => {
    dayNumber.value = Number(newVal.split('/').pop()) || 1;
    updateUnlockState();
    showTask.value = false;
  }
);

const isUnlocked = computed(() => dayNumber.value <= currentUnlockedDay.value);

const note = computed(() => notes[dayNumber.value - 1] || '');
const task = computed(() => tasks[dayNumber.value - 1] || '');

const updateUnlockState = () => {
  const unlockedFromStorage = Number(localStorage.getItem('unlockedDay') || 1);

  if (dayNumber.value === unlockedFromStorage && unlockedFromStorage < 14) {
    const next = unlockedFromStorage + 1;
    localStorage.setItem('unlockedDay', next.toString());
    currentUnlockedDay.value = next;
  } else {
    currentUnlockedDay.value = unlockedFromStorage;
  }
}

onMounted(() => {
  updateUnlockState();
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
