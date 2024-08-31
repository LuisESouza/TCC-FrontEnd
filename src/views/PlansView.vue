<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import Buttons from '@/components/utils/Buttons.vue';
import apiService from '@/stores/services/apiService';

const api = new apiService();
const planos = ref([]);

const loadPlans = async () => {
    try {
        // const url = "http://localhost:3000/api/dicefit/planos";
        const url = "https://tcc-backend-smx9.onrender.com/api/dicefit/planos";
        const response = await api.apiGet(url);
        console.log("Response:", response); 
        planos.value = response;               
        console.log("Planos Value:", planos.value);
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    loadPlans();
});

const preco = ref('20');
</script>

<template>
    <div class="container">
        <header>
            <router-link to="/profile" class="exit"><i class="fas fa-x" style="color: white;"></i></router-link>
        </header>

        <main class="content flex">
            <div  v-for="(plano, index) in planos" :key="index" class="plans-container">
                <div class="plans-header">
                    <h1>{{ plano.nome }}</h1>
                </div>
                
                <div class="plans-body">
                    <p>{{ plano.descricao }}</p>
                </div>
                <Buttons :titleButton="'Comprar por '+ plano.preco"/>
            </div>
        </main>
    </div>
</template>

<style scoped>

header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #202024;
  padding: 10px;
  border-radius: 0 0 8px 8px;
  color: #fff;
  display: flex;
  align-items: center;
  z-index: 1000;
  justify-content: space-between;
}

.plans-container {
    background-color: #202024;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
}
</style>