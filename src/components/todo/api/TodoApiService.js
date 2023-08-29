
import { apiClient } from "../api/ApiClient";

export const retieveTodoFromRESTAPI = (username) => apiClient.get(`/users/${username}/todos`);

export const deleteTodoApi = (username,id) => apiClient.delete(`/users/${username}/todos/${id}`);

export const retieveIndividualTodoFromRESTAPI = (username,id) => apiClient.get(`/users/${username}/todos/${id}`);

export const updateIndividualTodoApi = (username,id,todo) => apiClient.put(`/users/${username}/todos/${id}`,todo);

export const createIndividualTodoApi = (username,todo) => apiClient.post(`/users/${username}/todos`,todo);