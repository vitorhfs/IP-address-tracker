import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.ipify.org?format=json',
})

export default api;