import baseService from './service.js';
const getToken = () => localStorage.getItem("token");
export function addNote(note){
    return baseService.post('/notes?token='+getToken(),note,{ headers: {'Content-Type': 'application/json'} })
}
export function getNotes(){
    return baseService.get('/notes?token='+getToken());
}
export function deleteNote(id) {
    return baseService.delete('/notes?token='+getToken()+"&id="+id);
}
export function updateNote(note) {
    return baseService.post('/note?token='+getToken(), note,{ headers: {'Content-Type': 'application/json'} });
}

