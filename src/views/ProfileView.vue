<script setup>
import { ref, onMounted } from 'vue';
//Import components
import Timepicker from 'vue3-timepicker';
import 'vue3-timepicker/dist/VueTimepicker.css';
import Footer from '@/components/Footer.vue';
import NavInfo from '@/components/NavInfo.vue';
import Inputs from '@/components/utils/Inputs.vue';
import Buttons from '@/components/utils/Buttons.vue';
import apiService from '@/stores/services/apiService';
//Import UTILS
import loadInfo from '../utils/loadInfo';
import Format from '@/utils/Format';
const loadInfos = new loadInfo();
const formatInstance = new Format();
const formData = ref({
    nome_completo: '',
    email: '',
    altura: '',
    peso: '',
    objetivo: '',
    cpf: '',
    data_treino_inicio: '',
    data_treino_fim: '',
    hora_treino_inicio: '',
    hora_treino_fim: '',
    senha: '',
});
const isEditing = ref(false);
const loadProfile = async () => {
    const profileData = await loadInfos.loadProfile();
    formData.value = { ...profileData };
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
    const url = import.meta.env.VITE_URL_UPDATE_PROFILE;
    const urlResetPass = import.meta.env.VITE_URL_UPDATE_PASSWORD
    const api = new apiService();
    await api.apiPut(url, {
      altura: formData.value.altura,
      peso: formData.value.peso,
      objetivo: formData.value.objetivo,
      data_treino_inicio: formData.value.data_treino_inicio,
      data_treino_fim: formData.value.data_treino_fim,
      hora_treino_inicio: formData.value.hora_treino_inicio,
      hora_treino_fim: formData.value.hora_treino_fim,
    }), api.apiPut(urlResetPass, {
        email: formData.value.email,
        senha: formData.value.senha
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
                            <div class="d-flex gap-2 mb-2">
                                <div class="flex-fill">
                                    <span>CPF:</span>
                                    <Inputs class="form-control" placeholder="CPF" :value="formatInstance.formatCPF(formData.cpf)" disabled="true"/>
                                </div>
                                <div class="flex-fill">
                                    <span>Senha:</span>
                                    <Inputs class="form-control" placeholder="Mudar senha" typeInput="password" v-model="formData.senha" :disabled="!isEditing"/>
                                </div>
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
                                    <b-dropdown class="dropdown-btn" id="dropdown-1" text="Objetivo" variant="outline-secondary" :disabled="!isEditing" style="height: 45px;">
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
                                    <span style="margin-right: 200px;">Dias de treino:</span>
                                    <b-dropdown 
                                        id="dropdown-1" 
                                        :text="formData.data_treino_inicio || 'Dia inicial'" 
                                        variant="outline-secondary" 
                                        :disabled="!isEditing" 
                                        style="height: 45px;">
                                        <b-dropdown-item @click="formData.data_treino_inicio = 'Segunda'">Segunda</b-dropdown-item>
                                        <b-dropdown-item @click="formData.data_treino_inicio = 'Terca'">Terça</b-dropdown-item>
                                        <b-dropdown-item @click="formData.data_treino_inicio = 'Quarta'">Quarta</b-dropdown-item>
                                        <b-dropdown-item @click="formData.data_treino_inicio = 'Quinta'">Quinta</b-dropdown-item>
                                        <b-dropdown-item @click="formData.data_treino_inicio = 'Sexta'">Sexta</b-dropdown-item>
                                        <b-dropdown-item @click="formData.data_treino_inicio = 'Sabado'">Sábado</b-dropdown-item>
                                        <b-dropdown-item @click="formData.data_treino_inicio = 'Domingo'">Domingo</b-dropdown-item>
                                    </b-dropdown>

                                    <span class="m-3">Até</span>
                                    <!-- Dropdown para o dia final -->
                                    <b-dropdown 
                                        id="dropdown-2" 
                                        :text="formData.data_treino_fim || 'Dia final'" 
                                        variant="outline-secondary" 
                                        :disabled="!isEditing" 
                                        style="height: 45px;">
                                        <b-dropdown-item @click="formData.data_treino_fim = 'Segunda'">Segunda</b-dropdown-item>
                                        <b-dropdown-item @click="formData.data_treino_fim = 'Terca'">Terça</b-dropdown-item>
                                        <b-dropdown-item @click="formData.data_treino_fim = 'Quarta'">Quarta</b-dropdown-item>
                                        <b-dropdown-item @click="formData.data_treino_fim = 'Quinta'">Quinta</b-dropdown-item>
                                        <b-dropdown-item @click="formData.data_treino_fim = 'Sexta'">Sexta</b-dropdown-item>
                                        <b-dropdown-item @click="formData.data_treino_fim = 'Sabado'">Sábado</b-dropdown-item>
                                        <b-dropdown-item @click="formData.data_treino_fim = 'Domingo'">Domingo</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </div>

                            <!-- TimePicker -->
                            <div class="d-flex gap-2 mb-2">
                                <div class="flex-fill">
                                    <span>Horário de início:</span>
                                    <Timepicker 
                                    v-show="isEditing"
                                    v-model="formData.hora_treino_inicio" 
                                    format="HH:mm" 
                                    :disabled="!isEditing" 
                                    @update:modelValue="val => formData.hora_treino_inicio = formatInstance.formatTime(val)" 
                                    />
                                    <Inputs :value="formData.hora_treino_inicio" disabled="true" v-show="!isEditing"/>
                                </div>
                                <div class="flex-fill">
                                    <span>Horário de fim:</span>
                                    <Timepicker 
                                    v-show="isEditing"
                                    v-model="formData.hora_treino_fim" 
                                    format="HH:mm" 
                                    :disabled="!isEditing"
                                    @update:modelValue="val => formData.hora_treino_fim = formatInstance.formatTime(val)"                              
                                    />
                                    <Inputs :value="formData.hora_treino_fim" disabled="true" v-show="!isEditing"/>
                                </div>
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
