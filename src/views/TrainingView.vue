<script setup>
import NavInfo from '@/components/NavInfo.vue';
import Footer from '@/components/Footer.vue';
import Inputs from '../components/utils/Inputs.vue';
import Buttons from '../components/utils/Buttons.vue';
import SelectExercice from '../components/utils/SelectExercicio.vue';
import { ref } from 'vue';

const isEditing = ref(false);

const toggleShow = () => {
  isEditing.value = !isEditing.value;
};

const saveForm = () => {
  isEditing.value = false;
};
</script>

<template>
  <div class="container">
    <NavInfo />
    <main class="container my-4">
      <form v-if="isEditing" class="mb-4" @submit.prevent="saveForm">
        <div class="row">
          <div class="d-flex">
            <span>Exercicios</span>
            <SelectExercice />
          </div>
          
          <Inputs />
          <Inputs />
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
#btnMenu {
  font-size: 18px;
}
</style>