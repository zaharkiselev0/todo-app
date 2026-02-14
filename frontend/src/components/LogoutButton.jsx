export function LogoutButton({logout}) {
    function handleLogout(e){
        try{
            console.log("Попытка выхода");
            logout();
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