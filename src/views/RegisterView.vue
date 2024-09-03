<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores/authStore.js';
    import Buttons from '../components/utils/Buttons.vue';
    import Inputs from '../components/utils/Inputs.vue'
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
    // const apiUrl = "http://localhost:3000/api/dicefit/registro";
    const apiUrl = "https://tcc-backend-smx9.onrender.com/api/dicefit/registro";
    
    const api = new apiService();
    try {
        const response = await api.apiPost(apiUrl, formData.value);      
        if (response && response.token) {
            authStore.setToken(response.token);
            alert("Usuario REGISTRADO")
            // router.push('/home');
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
                <img class="imgPeso" src="../assets/pesoImg.png" alt="pinto">
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
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: 
            linear-gradient(to top, #121214, #00000069), 
            url('../assets/personaImg.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-blend-mode: darken;
        padding: 20px;
    }
    .content {
        width: 100%;
        max-width: 428px;
        height: 65vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #fff;
    }
    .container-form{
        height: 350px;
    }
    .header{
        margin-top: 25%;
        text-align: center;
    }   
    .header h1 {
        font-weight: bold;
        font-size: 28px;
        margin-bottom: 0.5rem;
    }
    .header p {
        font-size: 14px;
        color: #b0b0b0;
    }
    .form-header {
        margin-bottom: 25px;
        text-align: center;
    }
    .form-header p {
        font-size: 20px; 
    }
    .input-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 30px;
    }
    .footer {
        text-align: center;
        margin-top: 25%;
    }
    .footer p {
        margin-bottom: 5px;
    }
    .btnBack{
        background-color: transparent;
        color: #00875F;
        border: 1px solid #00875F;
    }
    .btnBack{
        background-color: transparent;
        color: #00875F;
        border: 1px solid #00875F;
    }

    @media (max-height: 740px) {
        .footer {
            margin-top: 5%;
        }
    }
</style>