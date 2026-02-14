import { createContext, useState } from 'react';
import { useTasks } from '../hooks/useTasks.jsx';

export const TaskContext = createContext({tasks: null, editValue: null, newTaskName: null, isEdit: null, editInput:null, editButton:null, editCancel:null, startEdit:null, deleteButton:null, toggleTask:null, createInputChange:null, createButton:null});

export function TaskProvider({children, userId}){
    const {tasks, create, update, del} = useTasks(userId);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [newTaskName, setNewTaskName] = useState('');

    function editInput(e){
        setEditValue(e.target.value);
    }

    function editButton(task){
        setEditingTaskId(null);
        setEditValue('');
        update.mutate({id:task.id, payload: {name: editValue}});
    }

    function editCancel(){
        setEditingTaskId(null);
    }

    function startEdit(task){
        setEditingTaskId(task.id);
        setEditValue(task.name);
    }

    function deleteButton(task){
        del.mutate({id: task.id});
    }

    function toggleTask(task){
        update.mutate({id: task.id, payload: {completed: !task.completed}});
    }

    function createInputChange(e){
        setNewTaskName(e.target.value);
    }

    function createButton(){
        create.mutate({name: newTaskName});
        setNewTaskName('');
    }

    function isEdit(task){
        return task.id === editingTaskId;
    }

    return (
        <TaskContext value={{tasks, editValue, newTaskName, isEdit, editInput, editButton, editCancel, startEdit, deleteButton, toggleTask, createInputChange, createButton}}>
            {children}
        </TaskContext>
    );
}