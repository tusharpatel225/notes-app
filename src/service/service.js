import axios from 'axios';
export const baseUrl = 'https://tushar-notes-api.herokuapp.com/'
const baseService = axios.create({
   baseURL: baseUrl
});

export default baseService;