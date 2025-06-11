import axios from 'axios';

const api = axios.create({
    baseURL: 'http://task-manager.test/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    },
});

export const getUsers = () => api.get('/users');
export const createUser = (data) => api.post('/users', data);
export const getUser = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
