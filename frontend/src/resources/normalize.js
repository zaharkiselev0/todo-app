export function normalizeTask(task){
    const normalized = {};

    if (!task){
        normalizeError("Пустая таска", true);
        return null;
    }

    if(typeof task.name === "string"){
        normalized.name = task.name;
    } else {
        normalizeError("Пустое имя таски", true);
        return null;
    }

    if (typeof task.created === "string" && !Number.isNaN(Date.parse(task.created))) {
        normalized.created = task.created;
    } else {
        normalized.created = new Date().toISOString();
        normalizeError("Неверный формат даты");
    }

    if (typeof task.completed === "boolean"){
        normalized.completed = task.completed;
    } else {
        normalized.completed = false;
        normalizeError("Неверный формат поля completed");
    }

    if (typeof task.id === "number" && Number.isInteger(task.id) ){
        normalized.id = task.id;
    } else {
        normalizeError("Неверный формат поля id");
        normalized.id = Date.now();
    }

    return normalized;
}

export function normalizeTaskArray(tasks){
    const normalized = tasks.
        map(t => normalizeTask(t)).
        filter(t => t !== null);
    return normalized;
}

function normalizeError(message, critical = false){
    const prefix = critical ? "❌ CRITICAL" : "⚠️";
    console.error(prefix, "Ошибка нормалайзера:", message);
}