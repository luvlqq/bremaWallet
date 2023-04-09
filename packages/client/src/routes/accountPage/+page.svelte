<script>
    let count = 0;

    function buttonCount() {
        count += 1;
    }
</script>

<h1>Number {count}</h1>
<button on:click={buttonCount}>Click</button>