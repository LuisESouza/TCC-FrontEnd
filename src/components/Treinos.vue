<script setup>
import { ref, computed, defineEmits, defineProps } from 'vue';
import apiService from '../stores/services/apiService';

const emit = defineEmits(['update-trainings']);
const api = new apiService();
const props = defineProps({
  treinos: Array,
  paginationTraining: false,
  paginationExercise: false,
  showExercisePage: false,
  height: {
    type: Number,
    default: 300
  },
  exercisesPerPage: {
    type: Number,
    default: 1,
  },
});

const updateTrainings = ref({
  id: '',
  training_stats: Boolean,
});

const exercises = ref(props.treinos || []);
const currentPage = ref(1);
const trainingsPerPage = 1;
const exercisesPerPage = props.exercisesPerPage;
const newExercise = ref({
  id_treino: '',
  id_exercicio: '',
  series: '',
  repeticoes: '',
  carga: '',
});

const editingState = ref({});
const isEditing = ref(false);

const paginatedTreinos = computed( () => {
  const start = (currentPage.value - 1) * trainingsPerPage;
  return exercises.value.slice(start, start + trainingsPerPage);
});

const totalTreinosPages = computed(() => {
  return Math.ceil(exercises.value.length / trainingsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalTreinosPages.value) currentPage.value++;
};

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const exercisePages = ref({});
const paginatedExercises = (treinoId) => {
  const treino = exercises.value.find((t) => t.id === treinoId);
  if (!treino || !Array.isArray(treino.exercicios)) return [];
  const page = exercisePages.value[treinoId] || 1;
  const start = (page - 1) * exercisesPerPage;
  return treino.exercicios.slice(start, start + exercisesPerPage);
};

const totalExercisePages = (treinoId) => {
  const treino = exercises.value.find((t) => t.id === treinoId);
  return treino && Array.isArray(treino.exercicios)
    ? Math.ceil(treino.exercicios.length / exercisesPerPage)
    : 1;
};

const nextExercisePage = (treinoId) => {
  if (exercisePages.value[treinoId] < totalExercisePages(treinoId)) {
    exercisePages.value[treinoId]++;
  }
};

const previousExercisePage = (treinoId) => {
  if (exercisePages.value[treinoId] > 1) {
    exercisePages.value[treinoId]--;
  }
};

const editExercices = (exerciseId) => {
  Object.keys(editingState.value).forEach((key) => {
    editingState.value[key] = false;
  });
  editingState.value[exerciseId] = true;
  isEditing.value = true;
};

const closeEdit = (exerciseId) => {
  editingState.value[exerciseId] = false;
  isEditing.value = false;
};

const saveExercices = async (exercise) => {
  try {
    const url = import.meta.env.VITE_URL_PUT_TREINO;
    await api.apiPut(url, exercise);

    const treinoIndex = exercises.value.findIndex((treino) => treino.id === exercise.id_treino);
    const exerciseIndex = exercises.value[treinoIndex].exercicios.findIndex((ex) => ex.id === exercise.id_exercicio);

    if (treinoIndex !== -1 && exerciseIndex !== -1) {
      exercises.value[treinoIndex].exercicios[exerciseIndex] = {
        ...exercises.value[treinoIndex].exercicios[exerciseIndex],
        ...exercise,
      };
    }

    emit('update-trainings', updateTrainings.value);
  } catch (error) {
    console.log(error);
  } finally {
    editingState.value[exercise.id_exercicio] = false;
    isEditing.value = false;
  }
};

const submit = (treino) => {
  updateTrainings.value.training_stats = !treino.training_stats;
  updateTrainings.value.id = treino.id;
  emit('update-trainings', updateTrainings);
};

props.treinos.forEach((treino) => {
  exercisePages.value[treino.id] = 1;
});
</script>


<template>
  <div class="container">
    <div class="card-training" v-for="(treino, index) in paginatedTreinos" :key="index">
      <div class="d-flex gap-3">
        <div class="" v-if="props.paginationTraining">
          <span class="training-name">{{ treino.nome_treino }} - </span>
          <span class="training-stats" :class="{'completed': treino.training_stats, 'in-progress': !treino.training_stats}">
            {{ treino.training_stats ? 'Completo' : 'Em andamento' }}
          </span>
        </div>
        <button class="btn-complete" @click="submit(treino)" v-show="!treino.training_stats">Completar</button>
      </div>
      <div class="info-treino ">
        <div class="container-exercicios" :style="{ height: `${props.height}px`, overflow: 'auto'}">
          <div class="exercicios" v-for="exercise in paginatedExercises(treino.id)" :key="exercise.id">
            <div class="exercise-item">
              <div class="exercise-content">
                <div class="d-flex justify-content-between">
                  <span class="exercise-label">{{ exercise.name }}</span>
                  <div class="d-flex gap-2">
                    <button class="btn-edit" @click="editExercices(exercise.id)" v-if="!editingState[exercise.id]">
                      <span class="fas fa-pencil"></span>
                    </button>
                    <button class="btn-save" 
                      @click="saveExercices({ 
                        id_treino: treino.id, 
                        id_exercicio: exercise.id, 
                        series: newExercise.series, 
                        repeticoes: newExercise.repeticoes, 
                        carga: newExercise.carga 
                      })" 
                      v-if="editingState[exercise.id]">
                      <span class="fas fa-check"></span>
                    </button>
                    <button class="btn-cancel" @click="closeEdit(exercise.id)" v-if="editingState[exercise.id]">
                      <i class="fas fa-x"></i>
                    </button>
                  </div>
                </div>

                <div class="d-flex justify-content-between">
                  <div class="exercise-details" v-show="!editingState[exercise.id]">
                    <span class="series">Séries:</span><span>{{ exercise.series }}</span>
                    <span class="repetitions">Repetições:</span><span>{{ exercise.repeticoes }}</span>
                    <span class="weight">Carga:</span><span>{{ exercise.carga }}</span>
                  </div>
                  <div class="container-input" v-if="editingState[exercise.id]">
                    <div class="input-group me-3">
                      <label class="label">Séries</label>
                      <input class="input-edit" type="text" placeholder="Séries" v-model="newExercise.series">
                    </div>
                    <div class="input-group me-3">
                      <label class="label">Repetições</label>
                      <input class="input-edit" type="text" placeholder="Repetições" v-model="newExercise.repeticoes">
                    </div>
                    <div class="input-group">
                      <label class="label">Carga</label>
                      <input class="input-edit" type="text" placeholder="Carga" v-model="newExercise.carga">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex gap-3 justify-content-center mb-0 p-0" v-if="props.showExercisePage">
          <div class="pagination-exercises">
            <button @click="previousExercisePage(treino.id)" :disabled="exercisePages[treino.id] === 1"><span class="arrow left"></span></button>
          </div>
          <div class="data-dia">
            <span class="page-info">Exercícios {{ exercisePages[treino.id] }} de {{ totalExercisePages(treino.id) }}</span>
          </div>
          <div class="pagination-exercises">
            <button @click="nextExercisePage(treino.id)" :disabled="exercisePages[treino.id] === totalExercisePages(treino.id)">
              <span class="arrow right"></span>
            </button>
          </div>
        </div>
        
        <span class="separator mb-1" v-if="props.paginationTraining"></span>
        <div class="date-day d-flex justify-content-center gap-5" v-if="props.paginationTraining">
          <div>
            <label>Horario:</label>
            <span class="time">{{ treino.hora_treino_inicio }} - {{ treino.hora_treino_fim }}</span>
          </div>
          <div>
            <label>Dia:</label>
            <span class="day">{{ treino.data_treino }}</span>
          </div>
        </div>   
      </div>

      <div class="d-flex gap-5 justify-content-center mb-0" v-if="props.paginationTraining">
        <div class="pagination-treinos mb-0">
          <button @click="previousPage" :disabled="currentPage === 1"><span class="arrow left"></span></button>
        </div>
        <div class="mt-2 mb-0">
          <span class="page-info">Treinos {{ currentPage }} de {{ totalTreinosPages }}</span>
        </div>
        <div class="pagination-treinos mb-0">
          <button @click="nextPage" :disabled="currentPage === totalTreinosPages"><span class="arrow right"></span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.inputs{
  height: 20px;
}
</style>