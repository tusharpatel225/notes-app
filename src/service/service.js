import axios from 'axios';
export const baseUrl = 'http://localhost:2000/'//'https://ancient-plains-49497.herokuapp.com/';
const baseService = axios.create({
   baseURL: baseUrl
});

export default baseService;