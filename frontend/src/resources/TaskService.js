import axios from 'axios';
import { getCookie } from './getCookie.js';
import { normalizeTaskArray, normalizeTask } from './normalize.js';

const api = axios.create({
    baseURL: 'http://localhost:8000/tasks/',
    withCredentials: true,
    headers: {
        'X-CSRFToken': getCookie('csrftoken'),
    },
});

export class TaskService{
    static async get(signal) {
        try{
            const result = await api.get('list/', { signal });
            if(result.status >= 200 && result.status <= 299){
                return normalizeTaskArray(result.data);
            } else {
                throw new TaskServiceError(`Не получилось обработать запрос list/. Статус ответа =  ${result.status}`);
            }
        } catch(e) {
            if (e?.name === 'CanceledError' || e?.name === 'AbortError' || e?.code === 'ERR_CANCELED') {
                throw e;
            } else{
                throw new TaskServiceError(`Не получилось обработать запрос list/. Ошибка сервера: ${e.message}`);
            }
        }
    }

    static async create(name) {
        try{
            const result = await api.post('create/', { name });
            if(result.status >= 200 && result.status <= 299){
                return normalizeTask(result.data);
            } else {
                throw new TaskServiceError(`Не получилось обработать запрос create/. Статус ответа = ${result.status}`);
            }
        } catch(e) {
            throw new TaskServiceError(`Не получилось обработать запрос list/. Ошибка сервера: ${e.message}`);
        }
    }

    static async update(id, payload) {
        try{
            const result = await api.patch(`update/${id}/`, payload);
            if(result.status >= 200 && result.status <= 299){
                return normalizeTask(result.data);
            } else {
                throw new TaskServiceError(`Не получилось обработать запрос update/. Статус ответа = result.status`);
            }
        } catch(e) {
            throw new TaskServiceError(`Не получилось обработать запрос list/. Ошибка сервера: ${e.message}`);
        }
    }

    static async del(id) {
        try{
            const result = await api.delete(`delete/${id}/`);
            if(!(result.status >= 200 && result.status <= 299)){
                throw new TaskServiceError(`Не получилось обработать запрос delete/. Статус ответа = ${result.status}`);
            }
        } catch(e) {
            throw new TaskServiceError(`Не получилось обработать запрос delete/. Ошибка сервера: ${e.message}`);
        }
    }
}

class TaskServiceError extends Error {
    constructor(message) {
        super(message);
    }
}