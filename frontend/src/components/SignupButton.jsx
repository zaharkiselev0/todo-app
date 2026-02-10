import { useContext } from 'react'

export function SignupButton() {
    function signupHandler(e){
           window.location.assign('http://localhost:8000/accounts/signup');
    }
    return (
        <>
            <button onClick={signupHandler}>Зарегистрироваться</button>
        </>
    );
}