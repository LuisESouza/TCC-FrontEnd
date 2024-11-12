<script setup>
import { ref, onMounted } from 'vue';
//components
import Footer from '@/components/Footer.vue';
import Treinos from '@/components/Treinos.vue';
import NavInfo from '@/components/NavInfo.vue';
import Buttons from '@/components/utils/Buttons.vue';
import apexchart from '@/components/ApexChart.vue';
import FeedBack from '@/components/FeedBack.vue';
//utils
import loadInfo from '@/utils/loadInfo';
import alterInfo from '@/utils/alterInfo';

const data = new Date();
const loadInfos = new loadInfo();
const alterinfo = new alterInfo();
const userInfo = ref({
    id_user: '',
    name_user: '',
    feed_back: '',
});
const show = ref(false);
const showRating = ref(false);
const treinoIdParaAvaliar = ref();

const trainingsToday = ref([]);
const exerciciosTrainingToday = ref([]);
const daysOfWeek = [
    'Domingo', 'Segunda', 
    'Terça', 'Quarta', 
    'Quinta', 'Sexta', 'Sábado'
];
// Funcao para alternar a visibilidade dos treinos
const showTrainings = () => {
    show.value = !show.value;
};
// Funcao para obter o nome do dia da semana
const getDayOfWeek = (date) => daysOfWeek[date.getDay()];
// Verifica se o treino e para hoje
const isToday = (treino) => {
    const dayOfWeekToday = getDayOfWeek(new Date());
    return treino.data_treino === dayOfWeekToday && treino.training_stats === false;
};
// Funcao para buscar o perfil do usuario
const fetchProfile = async () => {
    try {
        const response = await loadInfos.loadProfile();
        userInfo.value.id_user = response.id;
        userInfo.value.name_user = response.nome_completo;
        await fetchTrainings(userInfo.value.id_user);
    } catch (error) {
        console.log(error);
    }
};
// Funcao para buscar os treinos do usuario
const fetchTrainings = async (id_user) => {
    try {
        const response = await loadInfos.loadTreino(id_user);
        trainingsToday.value = response.filter(treino => isToday(treino));
        exerciciosTrainingToday.value = trainingsToday.value.length ? trainingsToday.value[0].exercicios : [];
    } catch (error) {
        console.log(error);
    }
};
// Funcao para finalizar o treino
const handleUpdateTraining = async (treino) => {
    try {
        treinoIdParaAvaliar.value = treino.value.id;
        await alterinfo.putTraining(treino.value);
        showRating.value = true;
    } catch (error) {
        console.log(error);
    }
};
// Funcao para enviar a avaliacao
const submitRating = async (rating) => {
    try {
        showRating.value = false;
        const data = {
            userId: userInfo.value.id_user,
            treinoId: treinoIdParaAvaliar.value,
            rating: rating.value
        };
        await alterinfo.postRating(data);
        window.location.reload(true);
    } catch (error) {
        console.log(error);
    }
};

onMounted(fetchProfile);
</script>

<template>
    <div class="container">
        <NavInfo />
        <FeedBack v-if="showRating" @feed-back-emit="submitRating"/>
        <main class="content">
            <div class="mt-3 mb-0">
                <h4 class="mb-0">Bem vindo, <span style="color: #00875F; font-weight: 800; font-style: bold;">{{ userInfo.name_user }}</span></h4>
            </div>

            <div class="container container-estatiscas p-4 mb-0">
                <h3 class="mb-1">Estatísticas</h3>
                <span class="separator mb-0"></span>
                <apexchart />
            </div>

            <div class="training-container">
                <div class="header d-flex justify-content-between gap-5">
                    <h3 class="mb-1">Treinos de Hoje</h3>
                    <button v-if="show" @click="showTrainings" class="btn-close"><i class="fas fa-x" style="color: white;"/></button>
                </div>
                <span class="separator mb-3"></span>
                <div v-if="trainingsToday.length > 0">
                    <div class="training-info p-3" v-for="treino in trainingsToday" :key="treino.id" v-show="!show">
                        <div class="d-flex justify-content-between mb-2">
                            <p> <i class="fas fa-dumbbell" style="color: #00875F;"/> <strong>Treino: </strong>{{ treino.nome_treino }}</p>
                            <p><i class="fas fa-calendar" style="color: #00875F;"/> <span>{{getDayOfWeek(data)}}</span></p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p><strong> <i class="fas fa-clock" style="color: #00875F;"/> Início:</strong> {{ treino.hora_treino_inicio }}</p>
                            <p><strong> <i class="fas fa-exclamation-circle" style="color: #00875F;"/> Fim:</strong> {{ treino.hora_treino_fim }}</p>
                        </div>
                    </div>
                    <div>
                        <div class="exercises-info" v-show="show">
                            <Treinos :showExercisePage="true" :treinos="trainingsToday"  :exercisesPerPage="1" height="90" @update-trainings="handleUpdateTraining"/>
                        </div>                 
                    </div>
                </div>
                <p v-else>Nenhum treino para hoje.</p>
                <div class="d-flex justify-content-center">
                    <Buttons titleButton="Mostrar treino" @click="showTrainings" v-if="!show"/>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>



<style scoped>
.training-container{
    margin-top: 5rem;
}
.training-container, .container-estatiscas {
    border-radius: 10px;
    margin-top: 0;
    background-color: rgba(59, 58, 58, 0.2);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    padding: 10px;
}

.training-container{
    margin-top: 50px;
}
.training-container:hover, .diet-container:hover, .container-estatiscas:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    border: 1px solid #00875F;
}
h3 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #00875F;
    margin-bottom: 10px;
}
.training-info p {
    margin: 0;
    font-size: 1rem;
    color: #b9b9b9;
}
.container {
    max-width: 900px;
    margin: 0 auto;
}
.separator{
    margin-top: 0;
}
.content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
@media (max-height: 740px) {
    .training-container{
    margin-top: 0rem;
    }
}
</style>