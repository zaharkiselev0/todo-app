import { useState, useEffect } from 'react';
import { getUser } from '../resources/authApi.js';

export function useUser(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        let ignore = false;

        async function loadUser(){
            console.log("Запрос на получение данных пользователя");
            try{
                const newUser = await getUser();
                if ( !ignore ){
                    if ( newUser ) {
                        console.log('Данные пользователя получены. user =', newUser);
                        setUser(newUser);
                    } else {
                        console.log('Данные пользователя отсутствуют. user = ', newUser);
                    }
                }
            } catch (e) {
                console.error('Ошибка получения данных пользователя: ', e);
            }
        }

        loadUser();
        return () => { ignore = true; };
    }, []);

    return {user, setUser};
}