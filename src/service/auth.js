import baseService from './service.js';

export function login(credentails){
    return baseService.post('/users/login',credentails)
} 
export function signUp(data){
    return baseService.post('/users',data)
}
export function signOut(token){
    return baseService.delete('/users/logout')
}