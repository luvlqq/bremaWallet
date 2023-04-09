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
            const response = await axios.post('http://localhost:3000/api/auth/login', { login, password });

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

    <label for="login">Имя пользователя:</label>
    <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs" id="login" bind:value={login}/>

    <label for="password">Пароль:</label>
    <input type="password" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs" id="password" bind:value={password}/>
    {#if message}
        <p>{message}</p>
    {/if}

    <button type="submit">Войти</button>
</form>
