<script>
    import Sidebar from '../components/sidebar.svelte';
    import Nav from "../components/Navbar.svelte";
    import Balance from '../components/dashboard/balance.svelte';
    import Transactions from '../components/dashboard/transactions.svelte';
    import Modal from '../components/dashboard/transferModal.svelte'

    import {onMount} from "svelte";

    let activeMenu = "";
    let showModal = false;

    function toggleModal() {
        showModal = !showModal;
    }

    onMount(() => {
        activeMenu = "home";
    });

    let balance = 1000;
    let transactions = [
        {amount: 500, type: 'Пополнение', date: '01.04.2023'},
        {amount: -200, type: 'Перевод', date: '02.04.2023'},
        {amount: 100, type: 'Пополнение', date: '03.04.2023'},
        {amount: -200, type: 'Перевод', date: '02.04.2023'},
        {amount: -200, type: 'Перевод', date: '02.04.2023'},

    ];
</script>
<style>


    .dashboard {
        justify-content: center;
        flex-direction: row;
        padding: 20px;
        margin-left: 250px;
    }
</style>
<Nav/>
<Sidebar/>
<div class="">
    <div class="dashboard">
        <div class="ml-64 flex justify-center items-center space-x-4">
            <div class="flex-grow">
                <Balance balance={balance} />
            </div>
            <div class="flex-grow">
                <Transactions transactions={transactions} />
            </div>
        </div>
    </div>
</div>
