import baseService from './service.js';
export function addNote(note){
    return baseService.post('/notes',note)
}
export function getNotes(){
    return baseService.get('/notes');
}
export function deleteNote(id) {
    return baseService.delete('/notes?id='+id);
}
export function updateNote(note) {
    return baseService.post('/note', note);
}

