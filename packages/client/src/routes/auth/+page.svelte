<script context="module">
    let email = '';
    let password = '';

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            // успешная аутентификация, перенаправление на главную страницу
            window.location.href = '/accountPage';
        } else {
            // вывод ошибки аутентификации
            console.error('Ошибка аутентификации');
        }
    }
</script>

<nav>
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/auth">Authorization</a>
        </li>
    </ul>
</nav>
<h1>welcome wewewe</h1>
<form on:submit={handleSubmit}>
    <label for="email">Email</label>
    <input type="email" id="email" bind:value={email} />

    <label for="password">Password</label>
    <input type="password" id="password" bind:value={password} />

    <button type="submit">Sign In</button>
</form>

<a href="/auth/register">Register</a>
