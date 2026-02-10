import { useContext } from 'react'

export function Greetings({name}) {
    const nameToGreet = name ? name : "Anonimus";

    return (
        <h1> Здарова, {nameToGreet}! </h1>
    );
}