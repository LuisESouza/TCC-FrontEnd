<script setup>
import NavInfo from '@/components/NavInfo.vue';
import Footer from '@/components/Footer.vue';
import Inputs from '../components/utils/Inputs.vue';
import Buttons from '../components/utils/Buttons.vue';
import SelectTypeExercicio from '../components/utils/SelectTypeExercicio.vue';
import CheckBoxExercice from '../components/utils/CheckBoxExercice.vue';
import { ref } from 'vue';
import apiService from '../stores/services/apiService';

const api = new apiService();
const isEditing = ref(false);
const exerciciosFiltrados = ref([]);
const exercicios = ref([]);

const toggleShow = () => {
  isEditing.value = true;
  getExercicios();
};

const saveForm = async () => {
  isEditing.value = false;
};

const handleTipoChange = async (tipo) => {
  await getExercicios(tipo);
};

const getExercicios = async (tipo = 'Todos') => {
  try {
    const url = `${import.meta.env.VITE_URL_EXERCICES}${tipo}`;
    const data = await api.apiGet(url);
    exercicios.value = data;
    exerciciosFiltrados.value = data;
    console.log(exercicios.value);
  } catch (error) {
    console.error('Erro ao buscar exercícios:', error);
  }
};
</script>

<template>
  <div class="container">
    <NavInfo />
    <main class="container mt-4">

      <form v-if="isEditing" class="mb-4" @submit.prevent="saveForm">
        <div class="row">

          <div class="container-exercices">
            <div class="d-flex flex-column">
              <span>Exercícios</span>
              <SelectTypeExercicio @update-tipo="handleTipoChange" />
            </div>

            <CheckBoxExercice :exercicios="exerciciosFiltrados" />
          </div>    
          
          <div class="container-inputs mt-3">
            <div>
              <Inputs titleInput="Nome treino" />
            </div>
            
            <div class="d-flex gap-4 mt-3 mb-4">
              <Inputs titleInput="Séries" typeInput="number" />
              <Inputs titleInput="Repetições" typeInput="number" />
              <Inputs titleInput="Carga" typeInput="number" />
            </div>
          </div>

        </div>

        <Buttons titleButton="Salvar" type="submit" />
      </form>

      <div v-if="!isEditing" class="d-flex flex-column align-items-center justify-content-center" style="min-height: 60vh;">
        <img src="@/assets/pesoImg.png" alt="Peso" class="img-fluid mb-3" style="width: 125px;">
        <Buttons titleButton="Criar treino" id="btnMenu" @click="toggleShow" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
</style>