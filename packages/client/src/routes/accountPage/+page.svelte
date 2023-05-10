<script>
	import Sidebar from '../components/sidebar.svelte';
	import Nav from '../components/Navbar.svelte';
	import Balance from '../components/dashboard/balance.svelte';
	import Transactions from '../components/dashboard/transactions.svelte';
</script>

<Nav />
<Sidebar />
<div class="test">
	<div class="dashboard">
		<div class="ml-64 flex items-center h-full">
			<div class="flex-grow">
				<Balance />
			</div>
			<div class="flex-grow ml-4 h-full">
				<Transactions />
			</div>
		</div>
	</div>
</div>

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
