import { UserData } from '../../routes/components/auth/login.service';
import { get } from 'svelte/store';

export let ErrorMessage;
export let FinalLoginPls;
export let uLogin;
let senderLogin = get(UserData);

export async function transfer(recipientLogin, amount) {
	if (!recipientLogin || !amount) {
		ErrorMessage = 'Please fill in all fields.';
		return;
	}

	try {
		const response = await fetch('http://localhost:3000/api/transaction', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				senderLogin,
				recipientLogin,
				amount
			})
		});
		const json = await response.json();
		if (response.ok) {
			window.location.replace('/accountPage');
		} else {
			ErrorMessage = json.message;
		}
	} catch (error) {
		ErrorMessage = error.response?.data?.message || error.message;
	}
}
