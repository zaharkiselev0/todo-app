import { useState, useRef, useContext } from 'react';
import { TaskContext } from './TaskProvider.jsx';

export function Task({task}) {
    const {editValue, isEdit, editInput, editButton, editCancel, startEdit, deleteButton, toggleTask} = useContext(TaskContext);

    return (
        <>
            <p>
                {isEdit(task) ? (
                    <>
                        <input value={editValue} onChange={editInput} />
                        <button onClick={() => editButton(task)}>Применить</button>
                        <button onClick={editCancel}>Отменить</button>
                    </>
                ) : (
                    <>
                        <span>
                            Имя таски: {task.name}, Дата: {task.created}, Выполнено: {task.completed ? "Да" : "Нет"}
                        </span>
                        <button onClick={() => startEdit(task)}>Изменить</button>
                        <button onClick={() => deleteButton(task)}>Удалить</button>
                    </>
                )}
                <br/>
                <label>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task)}
                    />
                    Выполнено
                </label>
            </p>
        </>
    );
}