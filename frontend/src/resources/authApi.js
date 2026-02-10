import axios from 'axios';
import { getCookie } from './getCookie.js';

const api = axios.create({
    baseURL: 'http://localhost:8000/accounts/',
    withCredentials: true,
    headers: {
        'X-CSRFToken': getCookie('csrftoken'),
    },
});

export async function getUser() {
    const { data } = await api.get('user/');
    return data;
}

export async function logoutUser(){
    api.post('logout/');
}