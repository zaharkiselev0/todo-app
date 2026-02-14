import { useReducer } from 'react';
import { useUser } from '../hooks/useUser.jsx';
import { TaskProvider } from './TaskProvider.jsx';
import { Greetings } from './Greetings';
import { LoginButton } from './LoginButton';
import { SignupButton } from './SignupButton';
import { LogoutButton } from './LogoutButton';
import { TasksView } from './TasksView';


export default function App() {
    const {user, logout} = useUser();

    return (
        <>
            <LoginButton />
            <SignupButton />
            <LogoutButton logout={logout}/>
            <Greetings name={user?.username}/>
            <TaskProvider userId={user?.id}>
                <TasksView/>
            </TaskProvider>
        </>
    );
}


