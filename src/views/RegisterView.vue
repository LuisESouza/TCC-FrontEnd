<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores/authStore.js';
    import Buttons from '@/components/utils/Buttons.vue';
    import Inputs from '@/components/utils/Inputs.vue'
    import apiService from '@/stores/services/apiService';
    const authStore = useAuthStore();
    const router = useRouter();
    const formData = ref({
        nome_completo: '',
        email: '',
        cpf: '',
        senha: '',
    })
    const Submit = async () => {
    const apiUrl = import.meta.env.VITE_URL_REGISTER;
    const api = new apiService();
    try {
        const response = await api.apiPost(apiUrl, formData.value);      
        if (response && response.token) {
            authStore.setToken(response.token);
            router.push('/home');
        } else {
            alert("Erro: Nenhum token foi retornado.");
        }
    } catch (error) {
        alert("Erro ao registrar:", error);
    }
}

</script>

<template>
    <div class="container">
      <main class="content">
        <div class="header">
            <div class="title-header">
                <img class="imgPeso" src="../assets/img/pesoImg.png" alt="pinto">
                <h1>Dice Fit</h1>
            </div>
            <p>Treine sua mente e o seu corpo</p>
        </div>
        
        <div class="container-form">
            <form class="form" @submit.prevent="Submit">
                <div class="form-header">
                    <p>Crie sua conta</p>
                </div>
        
                <div class="input-container">
                    <Inputs placeholder="Nome completo" typeInput="text" v-model="formData.nome_completo"/>
                    <Inputs placeholder="CPF" typeInput="text" v-model="formData.cpf"/>
                    <Inputs placeholder="E-mail" typeInput="email" v-model="formData.email"/>
                    <Inputs placeholder="Senha" typeInput="password" v-model="formData.senha"/>
                </div>
        
                <Buttons titleButton="Criar conta" idButton="regisBtn" typeButton="submit"/>
            </form>
  
            <div class="footer">
                <RouterLink to="/">
                    <Buttons class="btnBack" titleButton="Voltar para login"/>
                </RouterLink>
            </div>
        </div>  
      </main>
    </div>
</template>

<style scoped>
    @import '../assets/css/register.css';
    .container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: 
        linear-gradient(to top, #121214, #00000069), 
        url('../assets/img/personaImg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-blend-mode: darken;
    padding: 20px;
}
</style>