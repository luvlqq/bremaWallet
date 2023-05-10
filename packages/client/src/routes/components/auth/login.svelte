<script>
	import { submit } from '../auth/login.service';
	import { ErrorMessage } from '../../../services/transfer/transfer.js';

	let login;
	let password;

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		submit(login, password);
	};
</script>

<form on:submit|preventDefault={handleFormSubmit}>
	<div class="flex items-center justify-center flex-col mt-10">
		<label for="login" class="my-2">Login:</label>
		<input
			type="text"
			placeholder="login"
			class="input input-primary w-full max-w-xs"
			id="login"
			bind:value={login}
		/>
		<label for="password" class="my-2 mt-4">Password:</label>
		<input
			type="password"
			placeholder="password"
			class="input input-bordered input-primary w-full max-w-xs"
			id="password"
			bind:value={password}
		/>
		{#if ErrorMessage}
			<div
				class="my-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
				role="alert"
			>
				<span class="font-medium">Error!</span>
				{ErrorMessage}
			</div>
		{/if}
		<a
			href="../auth/register"
			class="my-5 hover:bg-purple-500 text-purple-700 font-semibold hover:text-white"
			>Create an account</a
		>
		<button
			type="submit"
			class="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
			>Log In</button
		>
	</div>
</form>
