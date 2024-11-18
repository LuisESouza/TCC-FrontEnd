import apiService from "../stores/services/apiService";
const api = new apiService();

class alterInfo {
    constructor() {}

    async putTrainingStats(treino) {
        try {
            const url = import.meta.env.VITE_URL_PUT_STATS_TREINO;
            await api.apiPut(url, { 
                id: treino.id, 
                training_stats: treino.training_stats 
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async putTrainingExercicios(treinoExercicio){
        try{
            const url = import.meta.env.VITE_URL_PUT_TREINO;
            await api.apiPut(url, {
                
            });
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async postRating(data) {
        try{
            const url = import.meta.env.VITE_URL_POST_RATING;
            const response = await api.apiPost(url, {
                id_treino: data.treinoId,
                id_user: data.userId,
                feedback: data.rating,
            });
            return response;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

export default alterInfo;
