<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import Buttons from '@/components/utils/Buttons.vue';
import apiService from '@/stores/services/apiService';

const api = new apiService();
const planos = ref([]);

const loadPlans = async () => {
    try {
        //const url = "http://localhost:3000/api/dicefit/planos";
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
</script>

<template>
    <div class="container">
        <header>
            <router-link to="/profile" class="exit"><i class="fas fa-chevron-left" style="color: white;"></i></router-link>
        </header>

        <main class="content">
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
  width: 100%;
  padding: 10px;
  color: #fff;
  display: flex;
  align-items: center;
}
.content{
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin-top: 2rem;
}

.plans-container {
    background-color: #202024;
    padding: 10px;
    text-align: center;
    border-radius: 10px;
}
</style>