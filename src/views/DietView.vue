<script setup>
// Components
import NavInfo from '@/components/NavInfo.vue';
import Footer from '@/components/Footer.vue';
import Inputs from '@/components/utils/Inputs.vue';
import SelectType from '@/components/utils/SelectType.vue';
import Buttons from '@/components/utils/Buttons.vue';

import { ref } from 'vue';

const showDietIa = ref(false);
const showDietManual = ref(false);

const toggleMenu = (menu) => {
    if (menu === 'manual') {
        showDietManual.value = !showDietManual.value;
        if (showDietManual.value) showDietIa.value = false;
    } else if (menu === 'ia') {
        showDietIa.value = !showDietIa.value;
        if (showDietIa.value) showDietManual.value = false;
    }
};

const objetivo = ref(['Ganhar peso', 'Manter o peso', 'Ganhar massa muscular']);
</script>

<template>
    <div class="container">
        <NavInfo />
        <main class="content">
            <div class="container create-diet">
                <h2>Criar dieta</h2>
                <div class="inputs-group">

                    <Inputs placeholder="Nome da dieta" /> <!-- Nome da dieta -->
                    <SelectType :tipos="objetivo" /> <!-- Objetivo -->
                    
                    <!-- Data Picker -->
                    <div class="d-flex gap-4">
                        <b-form-input 
                            type="date" 
                            id="example-datepicker" 
                            v-model="selectedDate"
                            class="data-picker-diet"
                        ></b-form-input>

                        <b-form-input 
                            type="date" 
                            id="example-datepicker" 
                            v-model="selectedDate"
                            class="data-picker-diet"
                        ></b-form-input>
                    </div>

                    <div class="d-flex gap-4">
                        <Inputs placeholder="Informe a altura" /> <!-- Altura -->
                        <Inputs placeholder="Informe o peso" /> <!-- Peso -->
                    </div>
                
                </div>
                
                <div class="d-flex button-group gap-3 mt-3">
                    <Buttons titleButton="Criar dieta Manual" @click="toggleMenu('manual')" />
                    <Buttons titleButton="Criar dieta com IA" @click="toggleMenu('ia')" />
                </div>

                <!-- Criar dieta manual -->
                <div v-show="showDietManual">
                    <p>Criar dieta manual</p>
                    <Inputs placeholder="Descrição da dieta" />
                </div>
                
                <!-- Criar dieta com IA -->
                <div v-show="showDietIa">
                    <p>Criar dieta IA</p>
                    <Buttons titleButton="Criar treino com IA" />
                </div>
            </div>

            <div class="container list-diet">
                <h2>Dietas Prontas:</h2>
            </div>
        </main>
        <Footer />
    </div>
</template>

<style scoped>
.data-picker-diet {
    background-color: transparent;
    border: 1px solid var(--vt-c-black-mute);
    color: #a8a8b3;
    height: 55px;
}

.data-picker-diet:focus {
    border: 1px solid var(--color-border);
    color: white;
    outline: none;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(65%) sepia(8%) saturate(100%) hue-rotate(180deg) brightness(85%);
}

.data-picker-diet:focus::-webkit-calendar-picker-indicator {
    filter: invert(1) brightness(2);
}
</style>
