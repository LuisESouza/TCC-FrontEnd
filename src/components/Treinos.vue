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

        <!-- Controles de paginacao dos exercícios -->
        <div class="pagination-exercises">
          <button @click="currentExercisePage--" :disabled="currentExercisePage === 1">
            <span class="arrow left"></span>
          </button>
          <span class="page-info">Página {{ currentExercisePage }} de {{ totalExercisePages(treino) }}</span>
          <button @click="currentExercisePage++" :disabled="currentExercisePage === totalExercisePages(treino)">
            <span class="arrow right"></span>
          </button>
        </div>

        <!-- Informacoes sobre o treino -->
        <div class="data-dia">
          <span class="time">{{ treino.hora_treino_inicio }} - {{ treino.hora_treino_fim }}</span>
          <span class="day">{{ treino.data_treino }}</span>
        </div>
      </div>
    </div>

    <!-- Controles de paginacao dos treinos -->
    <div class="pagination pagination-treinos" style="position: absolute; margin-top: 40rem;">
      <button @click="currentPage--" :disabled="currentPage === 1">Anterior</button>
      <span class="mt-2">Página {{ currentPage }} de {{ totalTreinosPages }}</span>
      <button @click="currentPage++" :disabled="currentPage === totalTreinosPages">Próximo</button>
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
  font-size: 1.5rem;
  font-weight: bold;
  color: #00b37e;
}

.day {
  display: block;
  font-size: 1rem;
  color: #a8a8b3;
}
/* PAGINATION EXERCICIO */
.pagination-exercises {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  background-color: #1c1c1e;
  border-radius: 10px;
  padding: 10px;
  gap: 15px;
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

.pagination-treinos {
  display: flex;
  background-color: #1c1c1e;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  gap: 20px;
  padding: 10px;
  border-radius: 10px;
  justify-content: space-between;
  margin-top: 20px;
}

.pagination-treinos button {
  background-color: #00b37e;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-treinos button:hover:not(:disabled) {
  background-color: #009c70;
}

.pagination-treinos button:disabled {
  background-color: #4a4a4a;
  cursor: not-allowed;
}

/* PAGINATION TREINO*/
.pagination {
  display: flex;
  background-color: #1c1c1e;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  gap:20px;
  padding: 10px;
  border-radius: 10px;
  justify-content: space-between;
  margin-top: 20px;
}

.pagination button {
  background-color: #00b37e;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background-color: #009c70;
}

.pagination button:disabled {
  background-color: #4a4a4a;
  cursor: not-allowed;
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
