<script>
    import Sidebar from '../components/sidebar.svelte';
    import Nav from "../components/Navbar.svelte"
    import {onMount} from "svelte";
    let activeMenu = "";

    onMount(() => {
        activeMenu = "home";
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
        <p class="text-4xl text-gray-900 dark:text-white">HOME</p>
    </div>
</div>
