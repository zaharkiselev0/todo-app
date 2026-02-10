import { useReducer } from 'react';
import { useUser } from '../hooks/useUser.jsx';
import { TaskProvider } from './TaskProvider.jsx';
import { Greetings } from './Greetings';
import { LoginButton } from './LoginButton';
import { SignupButton } from './SignupButton';
import { LogoutButton } from './LogoutButton';
import { Tasks } from './Tasks';


export default function App() {
    const {user, setUser} = useUser();

    return (
        <>
            <LoginButton />
            <SignupButton />
            <LogoutButton setUser={setUser}/>
            <Greetings name={user?.username}/>
            <TaskProvider user={user}>
                <Tasks/>
            </TaskProvider>
        </>
    );
}


