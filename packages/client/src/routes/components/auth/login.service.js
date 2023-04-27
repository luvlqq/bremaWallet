import { writable } from 'svelte/store';
export let ErrorMessage;
export let FinalLoginPls;
let uLogin
export const UserData = writable();

export async function submit(login, password) {
    if (!login || !password) {
        ErrorMessage = 'Please fill in all fields.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/login',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                login,
                password
            })
        });
        const json = await response.json();
        if(response.ok) {
            window.location.replace('/accountPage');
            uLogin = json.login;
            UserData.set(uLogin);
        } else {
            ErrorMessage = json.message;
        }

    } catch (error) {
        ErrorMessage = error.response?.data?.message || error.message;
    }
}
