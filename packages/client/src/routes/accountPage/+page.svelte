<script>
    import Sidebar from '../components/sidebar.svelte';
    import Nav from "../components/Navbar.svelte";
    import Balance from '../components/dashboard/balance.svelte';
    import Transactions from '../components/dashboard/transactions.svelte';

    let balance = '';


    // onMount(async () => {
    //     try {
    //         const response = await fetch('http://localhost:3000/api/user/admin', {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             credentials: 'include'
    //         });
    //
    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log(data)
    //             balance = data.balance;
    //             console.log(balance)
    //         } else {
    //             throw new Error('Unable to fetch user data');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // });


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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch; /* добавляем выравнивание по высоте */
        height: 100%; /* задаем высоту родительского контейнера */
        padding: 3rem;
    }

    .flex-grow {
        flex: 1;
        height: 100%; /* задаем высоту дочерним элементам */
    }
</style>
<Nav/>
<Sidebar/>
<div class="">
    <div class="dashboard">
        <div class="ml-64 flex items-center h-full">
            <div class="flex-grow">
                <Balance balance={balance}/>
            </div>
            <div class="flex-grow ml-4 h-full">
                <Transactions transactions={transactions}/>
            </div>
        </div>
    </div>

</div>
