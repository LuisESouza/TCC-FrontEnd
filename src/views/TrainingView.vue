<script setup>
//Import Components
import NavInfo from '@/components/NavInfo.vue';
import Footer from '@/components/Footer.vue';
import Inputs from '@/components/utils/Inputs.vue';
import Buttons from '@/components/utils/Buttons.vue';
import Treinos from '@/components/Treinos.vue';
import SelectTypes from '@/components/utils/SelectType.vue';
import CheckBoxExercice from '@/components/utils/CheckBoxExercice.vue';
//
import { ref, onMounted } from 'vue';
import apiService from '@/stores/services/apiService';
// Utils
import loadInfo from '@/utils/loadInfo';
import alterInfo from '@/utils/alterInfo'
const isLoading = ref(false);

const loadinfos = new loadInfo();
const alterinfos = new alterInfo();
const api = new apiService();

const isEditing = ref(false);
const hasTrainings = ref(false);

const typesExercices = ref(['Todos','Peito','Braço','Bíceps','Tríceps','Ombro','Abdômen','Costas','Perna']);
const typesTrainings = ref(['Terminados','Em andamento']);

const filteredExercises = ref([]);
const selectedExercises = ref([]);
const exercises = ref([]);
const trainings = ref([]);

const formData = ref({
    // Treino
    nome_treino: '',
    id_cliente: '',
    hora_treino_inicio: '',
    hora_treino_fim: '',
    data_treino: '',
    training_stats: false,
    // Treino_Exercicio
    id_treino: '',
    repeticoes: '',
    carga: '',
    series: '',
    exercicios_id: '',
});
// Salvar o formulario
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
// Alternar seleo de exercicio
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
// Manipular mudanca de tipo de exercicio
const handleTypeChange = async (type) => {
    await fetchExercises(type);
};
// Manipular mudanca no trieno
const handleUpdateTraining = async (treino) => {
  await putTraining(treino.value);
  window.location.reload(true);
};
// Buscar exercicios
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
//Modificar o treino e Marcar como concluido
const putTraining = async(treino) =>{
  await alterinfos.putTraining(treino);
}
// Buscar treinos
const fetchTrainings = async () => {
  isLoading.value = true;
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
    } finally{
      isLoading.value = false;
    }
};
const closeForm = async () => {
    isEditing.value = false;
    await fetchTrainings();
    hasTrainings.value = trainings.value.length > 0;
};
const toggleShow = () => {
    isEditing.value = true;
    hasTrainings.value = false;
    fetchExercises();
};
onMounted(async () => {
    await fetchProfile();
    await fetchTrainings();
});
</script>

<template>
  <div class="container">
    <NavInfo />
    <main class="container">
      <!-- Formulario para criar treino -->
      <form v-if="isEditing" class="mb-4" @submit.prevent="saveForm">
        <div class="row">
          <!-- Secao de Exercicios -->
          <div class="container-exercices">
            <div class="d-flex flex-column">
              <span>Exercícios</span>
              <SelectTypes @update-tipo="handleTypeChange" :tipos="typesExercices" />
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
        <img src="@/assets/img/pesoImg.png" alt="Peso" class="img-fluid mb-3" style="width: 125px;">
        <Buttons titleButton="Criar treino" id="btnMenu" @click="toggleShow" />
      </div>

      <div v-if="hasTrainings">
        <div class="d-flex gap-4">
          <SelectTypes class="slc-type-training" :tipos="typesTrainings"/>
          <Buttons titleButton="Criar treino" id="btnMenu" @click="toggleShow" />
        </div>
        
        <div class="container-treinos">
          <Treinos :training_data="true" exercisesPerPage="40" :paginationTraining="true" :treinos="trainings" @update-trainings="handleUpdateTraining"/>
        </div>
      </div>

    </main>
    <Footer />
  </div>
</template>

<style scoped>
</style>