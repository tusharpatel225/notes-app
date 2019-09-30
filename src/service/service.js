import axios from 'axios';

export const baseUrl = 'https://tushar-notes-api.herokuapp.com/'
const baseService = axios.create({
    baseURL: baseUrl
});
baseService.interceptors.request.use((config) => {
    config.params = {...config.params, token: localStorage.getItem("token")}
    return config;
})
baseService.interceptors.response.use(
    (response) => {
        return response
    },
    ({response}) => {
        if(response && response.status === 401){
            localStorage.removeItem("token");
            window.location = "/login";
        }
        return Promise.reject(response)
    }
)
export default baseService;