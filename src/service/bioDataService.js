import baseService from './service.js';
const getToken = () => localStorage.getItem("token");
export function uploadBioData(data){
    return baseService.post('/users/bioData?token='+getToken(),data,{ headers: {'Content-Type': 'application/json'} })
}
export function getBioData(){
    return baseService.get('/users/bioData?token='+getToken(),null,{ headers: {'Content-Type': 'application/json'} })
}

