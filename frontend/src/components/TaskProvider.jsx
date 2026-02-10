import { createContext } from 'react';
import { useTasks } from '../hooks/useTasks.jsx';

export const TaskContext = createContext({tasks: null, create: null, update: null, del: null});

export function TaskProvider({children, user}){
    const {tasks, create, update, del, errors} = useTasks(user);

    return (
        <TaskContext value={{tasks, create, update, del, errors}}>
            {children}
        </TaskContext>
    );
}