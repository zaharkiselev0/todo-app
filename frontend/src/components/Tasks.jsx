import { useState, useRef, useContext } from 'react';
import { TaskContext } from './TaskProvider.jsx';

export function Tasks() {
    const {tasks, create, update, del, errors} = useContext(TaskContext);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [newTaskName, setNewTaskName] = useState('');

    const taskItems = tasks?.map(task =>
        <li key={task.id}>
            <p>
                {editingTaskId === task.id ? (
                    <>
                        <input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                        />
                        <button onClick={interval(() => updateName(task.id, "name", editValue))}>Применить</button>
                        <button onClick={() => cancelEdit()}>Отменить</button>
                    </>
                ) : (
                    <>
                        <span>
                            Имя таски: {task.name}, Дата: {task.created}, Выполнено: {task.completed ? "Да" : "Нет"}
                        </span>
                        <button onClick={() => startEdit(task)}>Изменить</button>
                        <button onClick={interval(() => del(task.id))}>Удалить</button>
                    </>
                )}
                <br/>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={interval(() => update(task.id, "completed", !task.completed))}
                />
                <span>Выполнено</span>
            </p>
        </li>
    );

    const allErrors = [
        errors.load,
        errors.create,
        ...Object.values(errors.update),
        ...Object.values(errors.delete),
    ].filter(Boolean);

    const errorItems = allErrors.map((e, idx) =>
        <li key={idx}>
            <p>{e}</p>
        </li>
    );

    function interval(fn){
        async function intervaled(){
            try{
                await fn();
            } catch(e) {
                let repeat = true;
                const timerId = setInterval(async () => {await fn(); repeat = false;}, 1000);
                setInterval(() => {!repeat && clearInterval(timerId)}, 900);
                setTimeout(() => {clearInterval(timerId)}, 10000);
            }
        }
        return intervaled;
    }

    function startEdit(task){
        setEditingTaskId(task.id);
        setEditValue(task.name);
    }

    function cancelEdit(){
        setEditingTaskId(null);
    }

    async function updateName(taskId, field, newVal){
        setEditingTaskId(null);
        setEditValue('');
        interval(() => update(taskId, field, newVal))();
    }

    return (
        <>
            <input value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} onKeyDown={e => e.key === 'Enter' && interval(() => create(newTaskName))}/>
            <button onClick={interval(() => {create(newTaskName);})}>Создать таску</button>
            <ul>
                {taskItems}
            </ul>
            <ul>
                {errorItems}
            </ul>
        </>
    );
}