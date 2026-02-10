import { useContext } from 'react'

export function LoginButton() {
    function loginHandler(e){
           window.location.assign('http://localhost:8000/accounts/login');
    }
    return (
        <>
            <button onClick={loginHandler}>Войти</button>
        </>
    );
}