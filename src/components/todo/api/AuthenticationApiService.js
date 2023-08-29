import { apiClient } from "../api/ApiClient";

export const executeBasicAuthenticationService = (token) => apiClient.get(`/basicAuth`,{
    headers:{
        Authorization: token
    }
});


export const executeJWTAuthenticationService = (username,password) => apiClient.post(`/authenticate`,{username,password});