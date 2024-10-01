<script setup>
import { ref, onMounted } from 'vue';
import Footer from '@/components/Footer.vue';
import NavInfo from '@/components/NavInfo.vue';
import Inputs from '@/components/utils/Inputs.vue';
import Buttons from '@/components/utils/Buttons.vue';
import apiService from '@/stores/services/apiService';
import Format from '@/utils/Format';

const formatInstance = new Format();
const formData = ref({
    nome_completo: '',
    email: '',
    altura: '',
    peso: '',
    objetivo: '',
    cpf: ''
});
const isEditing = ref(false);

const loadProfile = async () => {
    try {
        //const url = "http://localhost:3000/api/dicefit/perfil"
        const url = "https://tcc-backend-smx9.onrender.com/api/dicefit/perfil";
        const api = new apiService();
        const response = await api.apiGet(url);
        formData.value = response;
    } catch (error) {
        console.log(error);
    }
};

const toggleEdit = () => {
    if (isEditing.value) {
        submit();
    } else {
        isEditing.value = true;
    }
};

const submit = async () => {
    try {
        //const url = "http://localhost:3000/api/dicefit/perfil/update"
        const url = "https://tcc-backend-smx9.onrender.com/api/dicefit/perfil/update";
        const api = new apiService();
        await api.apiPut(url, {
            altura: formData.value.altura,
            peso: formData.value.peso,
            objetivo: formData.value.objetivo,
        });
        isEditing.value = false;
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    loadProfile();
});
</script>

<template>
    <div class="container">
        <NavInfo />
        <main class="content">
            <!-- Avatar removido para simplificar -->
            <form @submit.prevent="toggleEdit">
                <div class="container mt-3">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="d-flex gap-2 mb-2">
                                <div class="flex-fill">
                                    <span>Nome:</span>
                                    <Inputs class="form-control" v-model="formData.nome_completo" disabled="true"/>
                                </div>
                                <div class="flex-fill">
                                    <span>Email:</span>
                                    <Inputs class="form-control input-email" v-model="formData.email" disabled="true"/>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group mb-2">
                                <span>CPF:</span>
                                <Inputs class="form-control" placeholder="CPF" :value="formatInstance.formatCPF(formData.cpf)" disabled="true"/>
                            </div>
                            <div class="d-flex gap-2 mb-2">
                                <div class="flex-fill">
                                    <span>Altura:</span>
                                    <Inputs class="form-control" placeholder="Altura" :value="formatInstance.formatAltura(formData.altura)" v-model="formData.altura" :disabled="!isEditing"/>
                                </div>
                                <div class="flex-fill">
                                    <span>Peso:</span>
                                    <Inputs class="form-control" placeholder="Peso" :value="formatInstance.formatPeso(formData.peso)" v-model="formData.peso" :disabled="!isEditing"/>
                                </div>
                            </div>
                            <div class="d-flex gap-2 mb-2">
                                <div class="flex-fill">
                                    <b-dropdown id="dropdown-1" text="Objetivo" variant="outline-secondary" :disabled="!isEditing" style="height: 56px;">
                                        <b-dropdown-item @click="formData.objetivo = 'Ganhar massa'">Ganhar massa</b-dropdown-item>
                                        <b-dropdown-item @click="formData.objetivo = 'Perder peso'">Perder peso</b-dropdown-item>
                                        <b-dropdown-item @click="formData.objetivo = 'Manter o peso'">Manter o peso</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                                <div class="flex-fill">
                                    <Inputs class="form-control" placeholder="Objetivo" v-model="formData.objetivo" disabled="true"/>
                                </div>
                            </div>

                            
                            <div class="d-flex gap-2 mb-2">
                                <!-- Dropdown para o dia inicial -->
                                <div class="flex-fill mt-1">
                                    <span style="margin-right: 240px;">Dias de treino:</span>
                                    <b-dropdown 
                                        id="dropdown-1" 
                                        :text="formData.diaTreinoInicio || 'Dia inicial'" 
                                        variant="outline-secondary" 
                                        :disabled="!isEditing" 
                                        style="height: 56px;">
                                        <b-dropdown-item @click="formData.diaTreinoInicio = 'Segunda'">Segunda</b-dropdown-item>
                                        <b-dropdown-item @click="formData.diaTreinoInicio = 'Terca'">Terça</b-dropdown-item>
                                        <b-dropdown-item @click="formData.diaTreinoInicio = 'Quarta'">Quarta</b-dropdown-item>
                                        <b-dropdown-item @click="formData.diaTreinoInicio = 'Quinta'">Quinta</b-dropdown-item>
                                        <b-dropdown-item @click="formData.diaTreinoInicio = 'Sexta'">Sexta</b-dropdown-item>
                                        <b-dropdown-item @click="formData.diaTreinoInicio = 'Sabado'">Sábado</b-dropdown-item>
                                        <b-dropdown-item @click="formData.diaTreinoInicio = 'Domingo'">Domingo</b-dropdown-item>
                                    </b-dropdown>

                                    <span class="m-3">Até</span>
                                    <!-- Dropdown para o dia final -->
                                    <b-dropdown 
                                        id="dropdown-2" 
                                        :text="formData.diaTreinoFinal || 'Dia final'" 
                                        variant="outline-secondary" 
                                        :disabled="!isEditing" 
                                        style="height: 56px;">
                                        <b-dropdown-item @click="formData.diaTreinoFinal = 'Segunda'">Segunda</b-dropdown-item>
                                        <b-dropdown-item @click="formData.diaTreinoFinal = 'Terca'">Terça</b-dropdown-item>
                                        <b-dropdown-item @click="formData.diaTreinoFinal = 'Quarta'">Quarta</b-dropdown-item>
                                        <b-dropdown-item @click="formData.diaTreinoFinal = 'Quinta'">Quinta</b-dropdown-item>
                                        <b-dropdown-item @click="formData.diaTreinoFinal = 'Sexta'">Sexta</b-dropdown-item>
                                        <b-dropdown-item @click="formData.diaTreinoFinal = 'Sabado'">Sábado</b-dropdown-item>
                                        <b-dropdown-item @click="formData.diaTreinoFinal = 'Domingo'">Domingo</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </div>

                            <!-- Horarios -->
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-group">
                    <router-link to="/profile/plans">
                        <Buttons titleButton="Gerenciar assinatura" /> 
                    </router-link>
                    <Buttons type="submit" :titleButton="isEditing ? 'Salvar' : 'Editar perfil'" />
                </div>
            </form>
        </main>
        <Footer />
    </div>
</template>

<style scoped>
    .avatar-container{
        text-align: center;
    }
    .button-group {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    .button-group > * {
        flex: 1;
    }

    .button-group > *:first-child {
        margin-right: 10px;
    }

    .button-group > *:last-child {
        margin-left: 10px;
    }

    .button-group button {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        border: none;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .input-email {
        font-size: 14px;
    }

    .button-group{
        margin-top: 5rem;
    }

    @media (max-height: 740px) {
        .button-group button {
            padding: 8px;
            font-size: 14px;    
        }

        .button-group{
            margin-top: 2rem;
        }

        .form-control{
            height: 45px;
        }
    }
</style>