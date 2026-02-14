import { useReducer, useEffect } from 'react';
import { TaskService } from '../resources/TaskService.js';
import { normalizeTaskArray, normalizeTask } from '../resources/normalize.js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useTasks(userId) {
    const queryClient = useQueryClient();

    const tasks = useQuery({
        queryKey: ['todos', userId],
        queryFn: ({ signal }) => TaskService.get(signal),
        enabled: !!userId,
    });

    const updateMutation = useMutation({mutationFn: data => TaskService.update(data.id, data.payload),
        onMutate: async data => {
            const previousTodos = queryClient.getQueryData(['todos', userId]);
            const previous = previousTodos?.find(t => t.id === data.id);
            if (previous){
                const newTodo = {...previous, ...data.payload};
                await queryClient.cancelQueries(['todos', userId]);
                queryClient.setQueryData(['todos', userId], old => old.map(t => t.id !== data.id ? t : newTodo));
            }
            return { previousTodos }
        },

        onError: (err, data, context) => {
            queryClient.setQueryData(['todos', userId], context.previousTodos);
        },

        onSettled: () => {
            queryClient.invalidateQueries(['todos', userId]);
        },
    });

    const createMutation = useMutation({mutationFn: data => TaskService.create(data.name),
        onMutate: async data => {
            const newTodo = normalizeTask({name: data.name});
            const previousTodos = queryClient.getQueryData(['todos', userId]);
            if (newTodo && previousTodos){
                await queryClient.cancelQueries(['todos',userId]);
                queryClient.setQueryData(['todos', userId], old => [newTodo, ...old]);
            }
            return { previousTodos, id: newTodo?.id }
        },

        onError: (err, data, context) => {
            queryClient.setQueryData(['todos', userId], context.previousTodos);
        },

        onSuccess: async (task, variables, context) => {
            await queryClient.cancelQueries(['todos', userId]);
            if (context.previousTodos){
                if (context.id){
                    queryClient.setQueryData(['todos', userId], old => old.map(t => t.id === context.id ? task : t));
                }else{
                    queryClient.setQueryData(['todos', userId], old => [task, ...old]);
                }
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries(['todos', userId]);
        },
    });

    const deleteMutation = useMutation({mutationFn: data => TaskService.del(data.id),
        onMutate: async data => {
            const previousTodos = queryClient.getQueryData(['todos', userId]);
            if(previousTodos){
                await queryClient.cancelQueries(['todos',userId]);
                queryClient.setQueryData(['todos',userId], old => old.filter(t => t.id !== data.id));
            }
            return { previousTodos }
        },

        onError: (err, data, context) => {
            queryClient.setQueryData(['todos', userId], context.previousTodos);
            queryClient.invalidateQueries(['todos', userId]);
        },
    });

    return {
        tasks,
        create: createMutation,
        update: updateMutation,
        del: deleteMutation,
    };
}

