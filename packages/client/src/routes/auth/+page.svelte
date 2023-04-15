<script>
    import axios from 'axios';
    import Nav from "../components/Navbar.svelte";

    let login;
    let password;
    let ErrorMessage;

    async function handleSubmit(event) {
        event.preventDefault();

        if (!login || !password) {
            ErrorMessage = 'Please fill in all fields.';
            return;
        }

        try {
            // отправляем POST-запрос на сервер для авторизации
            const response = await axios.post('http://localhost:3000/api/auth/login', { login, password });

            // если авторизация прошла успешно, сохраняем токен в локальном хранилище браузера
            localStorage.setItem('token', response.data.token);

            // перенаправляем пользователя на домашнюю страницу после успешной авторизации
            window.location.href = '/accountPage';
        } catch (error) {
            // извлекаем сообщение об ошибке из JSON-ответа сервера
            ErrorMessage = error.response.data.message;
        }
    }
</script>

<Nav/>
<form on:submit={handleSubmit}>
<div class="flex items-center justify-center flex-col mt-10">
    <label for="login" class="my-2">Login:</label>
    <input type="text" placeholder="login" class="input input-primary w-full max-w-xs" id="login" bind:value={login}/>

    <label for="password" class="my-2 mt-4">Password:</label>
    <input type="password" placeholder="password" class="input input-bordered input-primary w-full max-w-xs " id="password" bind:value={password}/>
    {#if ErrorMessage}
        <div class="my-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">Error!</span> Incorrect login or password.
        </div>
    {/if}
    <a href="../auth/register" class="my-5 hover:bg-purple-500 text-purple-700 font-semibold hover:text-white">Create an account</a>
    <button type="submit" class="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">Log In</button>
</div>
</form>
