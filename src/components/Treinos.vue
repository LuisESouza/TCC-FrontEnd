<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
  treinos: Array
});
const exercises = ref(props.treinos || []);
const currentPage = ref(1);
const exercisesPerPage = 1;

const paginatedTreinos = computed(() => {
  const start = (currentPage.value - 1) * exercisesPerPage;
  return exercises.value.slice(start, start + exercisesPerPage);
});

const totalTreinosPages = computed(() => {
  return Math.ceil(exercises.value.length / exercisesPerPage);
});

const currentExercisePage = ref(1);
const exercisesPerTreinoPage = 3;

const paginatedExercises = (treino) => {
  const start = (currentExercisePage.value - 1) * exercisesPerTreinoPage;
  return treino.exercicios.slice(start, start + exercisesPerTreinoPage);
};

const totalExercisePages = (treino) => {
  return Math.ceil(treino.exercicios.length / exercisesPerTreinoPage);
};
</script>

<template>
  <div class="container">
    <!-- Paginando os treinos -->
    <div class="card-training" v-for="(treino, index) in paginatedTreinos" :key="index">
      <span class="training-name">{{ treino.nome_treino }}</span>
      <div class="info-treino">
        <div class="exercicios">
          <!-- Paginando os exercicios de cada treino -->
          <div v-for="(exercise, index) in paginatedExercises(treino)" :key="index" class="exercise-item">
            <div class="exercise-content">
              <span class="exercise-label">{{ exercise.name }}</span>
              <div class="exercise-details">
                <span class="series">Séries: {{ exercise.series }}</span>
                <span class="repetitions">Repetições: {{ exercise.repeticoes }}</span>
                <span class="weight">Carga: {{ exercise.carga }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Controles de paginacao dos exercicios -->
        <div class="pagination-exercises">
          <button @click="currentExercisePage--" :disabled="currentExercisePage === 1">
            <span class="arrow left"></span>
          </button>
          <span class="page-info">Exercícios {{ currentExercisePage }} de {{ totalExercisePages(treino) }}</span>
          <button @click="currentExercisePage++" :disabled="currentExercisePage === totalExercisePages(treino)">
            <span class="arrow right"></span>
          </button>
        </div>

        <span class="separator"></span>

        <!-- Controles de paginacao dos treinos -->
        <div class="d-flex gap-5" style="justify-content: center;">
          <div class="pagination-treinos">
            <button @click="currentPage--" :disabled="currentPage === 1"><span class="arrow left"></span></button>
          </div>
          <div class="data-dia">
            <span class="page-info">Treinos {{ currentPage }} de {{ totalTreinosPages }}</span>
            <span class="time">{{ treino.hora_treino_inicio }} - {{ treino.hora_treino_fim }}</span>
            <span class="day">{{ treino.data_treino }}</span>
          </div>
          <div class="pagination-treinos">
            <button @click="currentPage++" :disabled="currentPage === totalTreinosPages"><span class="arrow right"></span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin: 20px 0;
}

/* CARD */
.card-training {
  background-color: #1c1c1e;
  border-radius: 15px;
  padding: 20px;
  width: 100%;
  height: 500px;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  color: #e1e1e6;
  font-family: Arial, sans-serif;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-training:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
}

.training-name {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #00b37e;
  text-align: center;
}

.info-treino {
  padding: 10px 0;
}

.data-dia {
  text-align: center;
  margin-top: 15px;
}

.time {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: #00b37e;
}

.day {
  display: block;
  font-size: 1rem;
  color: #a8a8b3;
}
/* LINHA SEPARADORA */
.separator {
  display: block;
  width: 100%;
  background-color: #00b37e;
  height: 2px;
  margin: 1px 0;
}

/* PAGINATION TREINOS */
.pagination-treinos{
  background-color: #1c1c1e;
  border-radius: 10px;
  padding: 0px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.pagination-treinos button{
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  transition: transform 0.3s ease;
}

.pagination-treinos button:hover {
  transform: scale(1.1);
}

.pagination-treinos button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* PAGINATION EXERCICIOS */
.pagination-exercises {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  background-color: #1c1c1e;
  border-radius: 10px;
  padding: 1px;
  gap: 10px;
  width: 100%;
}

.pagination-exercises button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  transition: transform 0.3s ease;
}

.pagination-exercises button:hover {
  transform: scale(1.1);
}

.pagination-exercises button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #00b37e;
  font-weight: bold;
  font-size: 1rem;
}

.arrow {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-top: 2px solid #00b37e;
  border-right: 2px solid #00b37e;
}

.arrow.left {
  transform: rotate(-135deg);
}

.arrow.right {
  transform: rotate(45deg);
}

/* EXERCICIOS */
.exercise-item {
  background-color: #1c1c1e;
  padding: 10px 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  color: #e1e1e6;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

.exercise-item:hover {
  background-color: #2c2c2e;
}

.exercise-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.exercise-label {
  font-weight: bold;
  color: #00b37e;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.exercise-details {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.series,
.repetitions,
.weight {
  margin-left: 10px;
  white-space: nowrap;
}
</style>