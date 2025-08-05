<template>
  <div class="admin">
    <p>Поточний доступний день: {{ currentDay }}</p>

    <button @click="resetDay">Скинути до першого дня</button>

    <div class="admin-set" style="margin-top: 1rem">
      <label for="setDay">Встановити поточний день:</label>
      <input id="setDay" v-model.number="newDay" type="number" min="1" max="14" />
      <button @click="setDay">Підтвердити</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentDay = ref(1);
const newDay = ref(1);

onMounted(() => {
  currentDay.value = Number(localStorage.getItem('unlockedDay') || 1);
});

function resetDay() {
  localStorage.setItem('unlockedDay', '1');
  currentDay.value = 1;
}

function setDay() {
  if (newDay.value >= 1 && newDay.value <= 14) {
    localStorage.setItem('unlockedDay', newDay.value.toString());
    currentDay.value = newDay.value;
  }
}
</script>

<style scoped>
.admin {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  text-align: center;
}
input {
  width: 60px;
  margin-left: 0.5rem;
  padding: 0.3rem;
}
button {
  margin-top: 0.5rem;
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
.admin-set {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
}
</style>
