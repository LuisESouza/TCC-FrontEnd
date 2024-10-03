<script setup>
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import apiService from '@/stores/services/apiService';
    import Inputs from '@/components/utils/Inputs.vue';
    import Buttons from '@/components/utils/Buttons.vue';
    const email = ref('');
    const message = ref('');
    const messageColor = ref('');
    const Submit = async () => {
        const api = new apiService();
        const url = import.meta.env.VITE_URL_SENDEMAIL;
        try {
             const response = await api.apiPost(url, { email: email.value });
             console.log('Resposta do servidor:', response);
             messageColor.value = 'green';
             message.value = 'Email enviado com sucesso!';
        } catch (error) {
             console.error('Erro ao enviar email:', error);
             messageColor.value = 'red';
            message.value = 'Erro ao enviar email: ' + error.message;
        }
    };
</script>

<template>
    <div class="container">
        <main class="content">
            <div class="header mt-5">
                <div class="title-header">
                    <img class="imgPeso" src="../assets/pesoImg.png" alt="pinto">
                    <h1>Dice Fit</h1>
                </div>
                <p>Treine sua mente e o seu corpo</p>
            </div>

            <form @submit.prevent="Submit" class="d-flex flex-column gap-2">
                <div class="form-header">
                    <p>Recuperar senha</p>
                </div>

                <span v-if="message" :style="{ color: messageColor }">{{ message }}</span>
                <Inputs placeholder="Informe o email" typeInput="email" v-model="email"/>
                <Buttons title-button="Enviar email" typeButton="submit"/>
                <RouterLink to="/">
                    <Buttons title-button="Voltar para login" class="btnBack"/>
                </RouterLink>
            </form>
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
    height: 64vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;
}
.btnBack {
    background-color: transparent;
    color: #00875F;
    border: 1px solid #00875F;
}
.header, .form-header {
    text-align: center;
}
</style>