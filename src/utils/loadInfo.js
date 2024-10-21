import apiService from "../stores/services/apiService";
const api = new apiService();
class loadInfo{
    async loadProfile(){
        try {
            const url = import.meta.env.VITE_URL_LOAD_PROFILE;
            const response = await api.apiGet(url);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async loadTreino (id_cliente){
        try {
            const url = `${import.meta.env.VITE_URL_GET_TREINO}${id_cliente}`;
            const response = await api.apiGet(url);
            return response;
        } catch(error) {
            console.log(error);
        }
    }    
}
export default loadInfo;