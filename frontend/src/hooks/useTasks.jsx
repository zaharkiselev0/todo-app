import { useReducer, useEffect } from 'react';
import { taskReducer } from '../resources/taskReducer.js';
import { TaskService } from '../resources/TaskService.js'
import { normalizeTaskArray, normalizeTask } from '../resources/normalize.js';

const initialTasks = {
    tasks: [],
    errors: { load: null, create: null, update: {}, delete: {} }
};


export function useTasks(user) {
    const [state, dispatch] = useReducer(taskReducer, initialTasks);

    async function create(taskName) {
        dispatch({ type: 'clearError', errorType: 'create' });
        try {
            const task = await TaskService.create(taskName);
            const normalized = normalizeTask(task);
            dispatch({ type: 'add', task: normalized });
        } catch(e) {
            dispatch({ type: 'setError', errorType: 'create', errorMessage: e.message });
        }
    }

    async function update(taskId, field, value) {
        const oldValue = state.tasks.find(t => t.id === taskId)?.[field];
        dispatch({ type: 'change', taskId, field, value });

        try {
            await TaskService.update(taskId, { [field]: value });
            dispatch({ type: 'clearError', errorType: 'update', taskId });
        } catch(e) {
            dispatch({ type: 'setError', errorType: 'update', taskId, errorMessage: e.message });
            oldValue !== undefined && dispatch({ type: 'change', taskId, field, value: oldValue });
        }
    }

    async function del(taskId) {
        const task = state.tasks.find(t => t.id === taskId);
        dispatch({ type: 'delete', taskId });

        try {
            await TaskService.del(taskId);
            dispatch({ type: 'clearError', errorType: 'delete', taskId });
        } catch(e) {query
            dispatch({ type: 'setError', errorType: 'delete', taskId, errorMessage: e.message });
            task && dispatch({ type: 'add', task });
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        async function loadTasks() {
            try {
                const loaded = await TaskService.get(controller.signal);
                const normalized = normalizeTaskArray(loaded);
                dispatch({ type: 'set', tasks: normalized });
                dispatch({ type: 'clearError', errorType: 'load'});
            } catch(e) {
                if(e?.name === 'CanceledError' || e?.name === 'AbortError' || e?.code === 'ERR_CANCELED') return;
                dispatch({ type: 'setError', errorType: 'load', errorMessage: e.message });
            }
        }

        loadTasks();
        return () => controller.abort();
    }, [user]);

    return {
        tasks: state.tasks,
        errors: state.errors,
        create,
        update,
        del
    };
}