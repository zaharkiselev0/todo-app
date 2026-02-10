import { logoutUser } from '../resources/authApi.js';

export function LogoutButton({setUser}) {
    function handleLogout(e){
        try{
            console.log("Попытка выхода");
            logoutUser();
            setUser(null);
            console.log(`Пользователь вышел`);
        } catch(e){
            console.error(`Ошибка при попытке выйти: ${e}`);
        }
    }
    return (
        <>
            <button onClick={handleLogout}> Выйти </button>
        </>
    );
}