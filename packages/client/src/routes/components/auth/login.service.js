import { persisted } from 'svelte-local-storage-store';
export let ErrorMessage;
export let uLogin;
export const UserData = persisted('userlogin', uLogin);

export async function submit(login, password) {
	if (!login || !password) {
		ErrorMessage = 'Please fill in all fields.';
		return;
	}

	try {
		const response = await fetch('http://localhost:3000/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				login,
				password
			})
		});
		const json = await response.json();
		if (response.status === 201) {
			window.location.replace('/accountPage');
			uLogin = json.login;
			UserData.set(uLogin);
		} else {
			ErrorMessage = json.message;
		}
	} catch (e) {
		ErrorMessage = 'An error occurred while registering';
	}

	return uLogin;
}
