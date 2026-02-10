export function taskReducer(state, action) {
    switch(action.type) {
        case 'set':
            return { ...state, tasks: action.tasks };

        case 'add':
            return { ...state, tasks: [action.task, ...state.tasks] };

        case 'change':
            return {
                ...state,
                tasks: state.tasks.map(t =>
                    t.id === action.taskId ? { ...t, [action.field]: action.value } : t
                )};

        case 'delete':
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.taskId)};

        case 'setError':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.errorType]: action.taskId !== undefined
                        ? { ...state.errors[action.errorType], [action.taskId]: action.errorMessage }
                        : action.errorMessage
                }
            };

        case 'clearError':
            if (action.errorType === 'update' || action.errorType === 'delete') {
                const { [action.taskId]: _, ...rest } = state.errors[action.errorType];
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [action.errorType]: rest
                    }
                };
            }
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.errorType]: null
                }
            };

        default:
            throw Error('Unknown action: ' + action.type);
    }
}
