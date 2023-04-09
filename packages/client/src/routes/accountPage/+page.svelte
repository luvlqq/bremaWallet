<script>
    let count = 0;

    function buttonCount() {
        count += 1;
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
<h1>Brema wallet</h1>
<h1>Number {count}</h1>
<button on:click={buttonCount}>Click</button>