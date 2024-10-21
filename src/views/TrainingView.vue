<script setup>
import NavInfo from '@/components/NavInfo.vue';
import Footer from '@/components/Footer.vue';
import Inputs from '../components/utils/Inputs.vue';
import Buttons from '../components/utils/Buttons.vue';
import Treinos from '../components/Treinos.vue';
import SelectTypeExercicio from '../components/utils/SelectTypeExercicio.vue';
import CheckBoxExercice from '../components/utils/CheckBoxExercice.vue';
import { ref, onMounted } from 'vue';
import apiService from '../stores/services/apiService';
// Utils
import loadInfo from '../utils/loadInfo';

const loadinfos = new loadInfo();
const api = new apiService();

const isEditing = ref(false);
const hasTrainings = ref(false);
const filteredExercises = ref([]);
const exercises = ref([]);
const trainings = ref([]);
const selectedExercises = ref([]);

const formData = ref({
    // Treino
    nome_treino: '',
    id_cliente: '',
    hora_treino_inicio: '',
    hora_treino_fim: '',
    data_treino: '',
    // Treino_Exercicio
    id_treino: '',
    repeticoes: '',
    carga: '',
    series: '',
    exercicios_id: '',
});
// Salvar o formulário
const saveForm = async () => {
    try {
        const url = import.meta.env.VITE_URL_CREATE_TREINO_TEST;
        const exercisesToSave = filteredExercises.value.filter(exercise => exercise.selecionado);
        formData.value.exercicios_id = exercisesToSave.map(exercise => ({ id_exercicio: exercise.id }));
        await api.apiPost(url, formData.value);
        await fetchTrainings();
        isEditing.value = false;
        hasTrainings.value = true;
    } catch (error) {
        console.error("Erro ao salvar treino:", error);
    }
};
// Alternar seleção de exercício
const toggleSelectExercise = (exercise) => {
    const index = selectedExercises.value.findIndex(e => e.id === exercise.id);
    if (index > -1) {
        selectedExercises.value.splice(index, 1);
        exercise.selecionado = false;
    } else {
        selectedExercises.value.push(exercise);
        exercise.selecionado = true;
    }
};
// Manipular mudança de tipo de exercício
const handleTypeChange = async (type) => {
    await fetchExercises(type);
};
// Buscar exercícios
const fetchExercises = async (type = 'Todos') => {
    try {
        const url = `${import.meta.env.VITE_URL_EXERCICES}${type}`;
        const data = await api.apiGet(url);
        exercises.value = data;
        filteredExercises.value = data.map(exercise => ({
            ...exercise,
            selecionado: selectedExercises.value.some(selected => selected.id === exercise.id)
        }));
    } catch (error) {
        console.error('Erro ao buscar exercícios:', error);
    }
};
// Buscar perfil
const fetchProfile = async () => {
    try {
        const profileData = await loadinfos.loadProfile();
        formData.value.id_cliente = profileData.id;
        formData.value.hora_treino_inicio = profileData.hora_treino_inicio;
        formData.value.hora_treino_fim = profileData.hora_treino_fim;
    } catch (error) {
        console.log("Faça login");
    }
};
// Buscar treinos
const fetchTrainings = async () => {
    if (!formData.value.id_cliente) {
        alert("ID do cliente não definido.");
        return;
    }
    try {
        const data = await loadinfos.loadTreino(formData.value.id_cliente);
        trainings.value = data; 
        hasTrainings.value = trainings.value.length > 0; 
    } catch (error) {
        console.error("Erro ao buscar treinos:", error);
    }
};
const closeForm = async () => {
    isEditing.value = false;
    await fetchTrainings();
    hasTrainings.value = trainings.value.length > 0;
};
// Toggle para mostrar formulario de treino
const toggleShow = () => {
    isEditing.value = true;
    hasTrainings.value = false;
    fetchExercises();
};
// Efeito ao montar o componente
onMounted(async () => {
    await fetchProfile();
    await fetchTrainings();
});
</script>

<template>
  <div class="container">
    <NavInfo />
    <main class="container mt-4">

      <!-- Formulário para criar treino -->
      <form v-if="isEditing" class="mb-4" @submit.prevent="saveForm">
        <div class="row">
          <!-- Seção de Exercícios -->
          <div class="container-exercices">
            <div class="d-flex flex-column">
              <span>Exercícios</span>
              <SelectTypeExercicio @update-tipo="handleTypeChange" />
            </div>
            <CheckBoxExercice :exercicios="filteredExercises" @update-selected="toggleSelectExercise" />
          </div>

          <!-- Inputs -->
          <div class="container-inputs mt-3">
            <div class="d-flex fill gap-4">
              <Inputs titleInput="Nome treino" v-model="formData.nome_treino"/>
              <b-dropdown 
                id="dropdown-1" 
                :text="formData.data_treino || 'Dia do Treino'" 
                variant="outline-secondary" 
                :disabled="!isEditing" 
                style="height: 55px;">
                <b-dropdown-item @click="formData.data_treino = 'Segunda'">Segunda</b-dropdown-item>
                <b-dropdown-item @click="formData.data_treino = 'Terça'">Terça</b-dropdown-item>
                <b-dropdown-item @click="formData.data_treino = 'Quarta'">Quarta</b-dropdown-item>
                <b-dropdown-item @click="formData.data_treino = 'Quinta'">Quinta</b-dropdown-item>
                <b-dropdown-item @click="formData.data_treino = 'Sexta'">Sexta</b-dropdown-item>
                <b-dropdown-item @click="formData.data_treino = 'Sábado'">Sábado</b-dropdown-item>
                <b-dropdown-item @click="formData.data_treino = 'Domingo'">Domingo</b-dropdown-item>
              </b-dropdown>
            </div>

            <div class="d-flex gap-4 mt-3 mb-4">
              <Inputs titleInput="Séries" typeInput="number" v-model="formData.series"/>
              <Inputs titleInput="Repetições" typeInput="number" v-model="formData.repeticoes"/>
              <Inputs titleInput="Carga" typeInput="number" v-model="formData.carga"/>
            </div>
          </div>
        </div>

        <Buttons titleButton="Salvar" type="submit" />
        <Buttons class="mt-3" titleButton="Fechar" @click="closeForm" />
      </form>

      <div v-if="!isEditing && !hasTrainings" class="d-flex flex-column align-items-center justify-content-center" style="min-height: 60vh;">
        <img src="@/assets/pesoImg.png" alt="Peso" class="img-fluid mb-3" style="width: 125px;">
        <Buttons titleButton="Criar treino" id="btnMenu" @click="toggleShow" />
      </div>

      <div v-if="hasTrainings">
        <Buttons titleButton="Criar treino" id="btnMenu" @click="toggleShow" />
        <div class="container-treinos">
          <Treinos :treinos="trainings"/>
        </div>
      </div>

    </main>
    <Footer />
  </div>
</template>

<style scoped>
  .container-treinos {
    height: 70vh;
  }
</style>