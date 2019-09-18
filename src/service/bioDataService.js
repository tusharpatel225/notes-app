import baseService from './service.js';

export function uploadBioData(data){
    return baseService.post('/users/bioData',data)
}
export function getBioData(){
    return baseService.get('/users/bioData')
}

