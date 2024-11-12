<script setup>
import { ref, defineEmits, onMounted } from 'vue';

const tipoData = ref('');
const emit = defineEmits(['update-tipo']);
const props = defineProps({
  tipos: Array
});
const types = ref(props.tipos || []);
const setDefaultTipoData = () => {
  if (types.value.length > 0) {
    tipoData.value = types.value[0];
  }
}

const submit = () => {
  emit('update-tipo', tipoData.value);
};

onMounted(async () => {
  setDefaultTipoData();
});
</script>

<template>
  <div class="flex-fill">
    <div class="select">
      <select name="Exercicios" class="optionsInput" v-model="tipoData" @change="submit">
        <option v-for="tipo in types" :key="tipo" :value="tipo">{{ tipo }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.select {
    width: 100%;
    max-width: 400px;
}
.optionsInput {
    width: 100%;
    height: 50px;
    padding: 0 15px;
    border: 1px solid #323238;
    border-radius: 4px;
    background-color: #121214;
    font-size: 16px;
    color: #fff;
    transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='white' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'/%3E%3C/svg%3E");
    background-position: right 15px center;
    background-repeat: no-repeat;
    background-size: 12px;
}
.optionsInput option:checked {
    background-color: #00875F;
    color: #fff;
}
.optionsInput:focus {
    border-color: #00875F;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 135, 95, 0.5);
}
</style>