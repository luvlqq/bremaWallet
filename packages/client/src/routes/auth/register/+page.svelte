<script>
    import Nav from "../../components/Navbar.svelte";

    let login = "";
    let password = "";
    let password2 = "";
    let ErrorMessage = "";

    const comparePassword = () => {
        if (password !== password2) {
            ErrorMessage = "Passwords are different!";
        } else {
            ErrorMessage = "";
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // отменяем действие по умолчанию для кнопки submit

        comparePassword();

        if (ErrorMessage) {
            return; // если есть ошибки, прекращаем выполнение функции
        }

        const data = { login, password };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch("http://localhost:3000/api/auth/register", options);
            const json = await response.json();

            if (response.status === 201) {
                // Регистрация успешна, делаем что-то, например переходим на страницу с аккаунтом
                window.location.href = "/accountPage";
            } else {
                // Ошибка регистрации, показываем пользователю сообщение об ошибке
                ErrorMessage = json.message;
            }
        } catch (e) {
            // Ошибка во время отправки запроса на сервер
            ErrorMessage = "An error occurred while registering";
        }
    };
</script>
<Nav/>
<form on:submit={handleSubmit}>
    <div class="flex items-center justify-center flex-col">
        <label for="login" class="my-5">Login:</label>
        <input type="text" placeholder="login" class="input input-bordered input-primary w-full max-w-xs" id="login" bind:value={login} />
        <label for="password" class="my-2">Password:</label>
        <input type="password" placeholder="password" class="input input-bordered input-primary w-full max-w-xs " id="password" bind:value={password} />
        <label for="passwordConfirm" class="my-2">Confirm your password:</label>
        <input type="password" placeholder="password" class="input input-bordered input-primary w-full max-w-xs " id="passwordConfirm" bind:value={password2} />
        {#if ErrorMessage}
            <div class="my-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium">Error!</span> {ErrorMessage}
            </div>
        {/if}
        <a href="/auth" class="my-5 hover:bg-purple-500 text-purple-700 font-semibold hover:text-white">Log In</a>
        <button type="submit" class=" bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">Register</button>
    </div>
</form>
