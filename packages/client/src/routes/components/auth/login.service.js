import login from "./login.svelte";

let userLogin;
export let ErrorMessage;


export async function submit(login, password, ErrorMessage) {
    if (!login || !password) {
        ErrorMessage.set('Please fill in all fields.');
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
            userLogin = login;
            console.log(`user login is u ${userLogin}`);
            window.location.replace('/accountPage');
        } else {
            ErrorMessage.set(json.message);
        }

    } catch (error) {
        ErrorMessage.set(error.response?.data?.message || error.message);
    }

    console.log(`login service down login: ${userLogin}`);
    return userLogin;
}
export default userLogin;
