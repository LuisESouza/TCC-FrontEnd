<script setup>
import { onMounted, ref } from 'vue';
import apiService from '../../stores/services/apiService';

const exercises = ref([]);

const loadExercises = async () => {
    const url = import.meta.env.VITE_URL_EXERCICES;
    const api = new apiService();

    try {
        const response = await api.apiGet(url);
        exercises.value = response;
    } catch (error) {
        console.error('Erro ao carregar exercícios:', error);
    }
};

onMounted(() => {
    loadExercises();
});
</script>

<template>
    <div class="flex-fill">
        <div class="select">
            <select name="Exercicios" class="optionsInput">
                <option v-for="(exercise, index) in exercises" :key="index">{{ exercise.nome_exercicio }}</option>
            </select>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #1a1a1d;
}
.select {
    width: 100%;
    max-width: 400px;
}
.optionsInput {
    width: 100%;
    height: 55px;
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