<script>
    import Sidebar from '../components/sidebar.svelte';
    import Nav from "../components/Navbar.svelte";
    import Balance from '../components/dashboard/balance.svelte';
    import Transactions from '../components/dashboard/transactions.svelte';

    import {onMount} from "svelte";

    let activeMenu = "";

    onMount(() => {
        activeMenu = "home";
    });

    let balance = 1000;
    let transactions = [
        {amount: 500, type: 'Пополнение', date: '01.04.2023'},
        {amount: -200, type: 'Перевод', date: '02.04.2023'},
        {amount: 100, type: 'Пополнение', date: '03.04.2023'},
        {amount: -300, type: 'Перевод', date: '04.04.2023'},
        {amount: 200, type: 'Пополнение', date: '05.04.2023'}
    ];
</script>
<style>
    .page-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;
        height: 50%;
    }

    .dashboard {
        justify-content: space-between;
        flex-direction: row;
        padding: 20px;
        border-radius: 10px;
    }
</style>
<Nav/>
<div class="page-container">
    <Sidebar/>
</div>
<div class="">
    <div class="dashboard">
        <div class="ml-64">
            <div class="content">
                <Balance balance={balance} />
                <Transactions transactions={transactions} />
            </div>
        </div>
    </div>
</div>
