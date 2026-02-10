import { useReducer, useEffect } from 'react';
import { TaskService } from '../resources/TaskService.js'
import { normalizeTaskArray, normalizeTask } from '../resources/normalize.js';
import { useQuery, useMutation } from '@tanstack/react-query';

export function useTasks(user) {

    async function load(){
        const controller = new AbortController();
        const {isLoading, isError, data, error} = useQuery('todos', () => TaskService.get(controller.signal));
    }


    useEffect(() => {
        const controller = new AbortController();

//         async function loadTasks() {
//             try {
//                 const loaded = await TaskService.get(controller.signal);
//                 const normalized = normalizeTaskArray(loaded);
//                 dispatch({ type: 'set', tasks: normalized });
//                 dispatch({ type: 'clearError', errorType: 'load'});
//             } catch(e) {
//                 if(e?.name === 'CanceledError' || e?.name === 'AbortError' || e?.code === 'ERR_CANCELED') return;
//                 dispatch({ type: 'setError', errorType: 'load', errorMessage: e.message });
//             }
//         }

        const {isLoading, isError, data, error} = useQuery('todos', () => TaskService.get(controller.signal));

        loadTasks();
        return () => controller.abort();
    }, [user]);

}