import axios from 'axios';
export const baseUrl = 'https://tushar-notes-api.herokuapp.com/'
const baseService = axios.create({
   baseURL: baseUrl
});
baseService.interceptors.request.use((config) => {
    config.params = {...config.params, token:localStorage.getItem("token")}
    return config;
})
baseService.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject({ ...error })
    }
)
export default baseService;