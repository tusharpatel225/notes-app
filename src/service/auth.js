import baseService from './service.js';

export function login(credentails){
    return baseService.post('/users/login',credentails,{ headers: {'Content-Type': 'application/json'} })
} 
export function signUp(data){
    return baseService.post('/users',data,{ headers: {'Content-Type': 'application/json'} })
}
export function signOut(token){
    return baseService.delete('/users/logout',{params:{token}},{ headers: {'Content-Type': 'application/json'} })
}