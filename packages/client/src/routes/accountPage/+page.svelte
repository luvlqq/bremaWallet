<script>
    import Sidebar from "../components/sidebar.svelte";
    import Nav from "../components/Navbar.svelte"
    import { onMount } from 'svelte';
    export let text = '';
    export let delay = 50;

    let displayText = 'Home';

    onMount(() => {
        const intervalId = setInterval(() => {
            displayText = text.slice(0, displayText.length + 1);
            if (displayText === text) clearInterval(intervalId);
        }, delay);
    });
</script>
<style>
    .page-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;
        height: 50%;
    }
</style>
<Nav/>
<div class="page-container">
    <Sidebar/>
</div>
<div class="">
    <div class="ml-64">
        <p class="text-4xl text-gray-900 dark:text-white">{displayText}</p>
    </div>
</div>
