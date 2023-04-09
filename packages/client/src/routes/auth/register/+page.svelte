<script>
    // eslint-disable-next-line no-unused-vars
    import { onMount } from 'svelte';
    import axios from 'axios';
    import {data} from "autoprefixer";

    let login;
    let password;
    let message;

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            // отправляем POST-запрос на сервер для авторизации
            const response = await axios.post('http://localhost:3000/api/auth/register', { login, password });

            // если авторизация прошла успешно, сохраняем токен в локальном хранилище браузера
            localStorage.setItem('token', response.data.token);

            // перенаправляем пользователя на домашнюю страницу после успешной авторизации
            window.location.href = '/accountPage';
        } catch (error) {
            // если сервер вернул ошибку, выводим ее на экран
            // eslint-disable-next-line no-unused-vars
            message = data.error;
        }
    }
</script>
<form on:submit={handleSubmit}>
    <div class="flex items-center justify-center flex-col">
        <label for="login" class="my-6">Имя пользователя:</label>
        <input type="text" placeholder="login" class="input input-bordered input-primary w-full max-w-xs" id="login" bind:value={login}/>

        <label for="password" class="my-2">Пароль:</label>
        <input type="password" placeholder="password" class="input input-bordered input-primary w-full max-w-xs " id="password" bind:value={password}/>
        <label for="passwordConfirm" class="my-2">Подтвердите пароль:</label>
        <input type="password" placeholder="password" class="input input-bordered input-primary w-full max-w-xs " id="passwordConfirm" bind:value={password}/>
        {#if message}
            <p>{message}</p>
        {/if}
        <a href="/auth" class="my-5 hover:bg-purple-500 text-purple-700 font-semibold hover:text-white">Log In</a>
        <button type="submit" class=" bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">Register</button>
    </div>
</form>