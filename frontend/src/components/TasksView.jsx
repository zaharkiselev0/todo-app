import { useState, useRef, useContext } from 'react';
import { TaskContext } from './TaskProvider.jsx';
import { Task } from './Task.jsx';

export function TasksView() {
    const {tasks, editValue, newTaskName, isEdit, editInput, editButton, editCancel, startEdit, deleteButton, toggleTask, createInputChange, createButton} = useContext(TaskContext);

    const taskItems = tasks?.data?.map(task =>
        <li key={task.id}>
           <Task task={task} />
        </li>
    );

    return (
        <>
            <input
                value={newTaskName}
                onChange={createInputChange}
                onKeyDown={e => e.key === 'Enter' && createButton()}
            />
            <button onClick={createButton}>Создать таску </button>
            <ul>{taskItems}</ul>
        </>
    );
}