<script>
	import Nav from '../../components/Navbar.svelte';
	import Sidebar from '../../components/sidebar.svelte';
	import { onMount } from 'svelte';
	import {get} from "svelte/store";
	import {UserData} from "../../components/auth/login.service.js";
	let activeMenu = '';

	let UserLogin = get(UserData);
	export let sentTransfers = [];
	export let receivedTransfers = [];

	export const fetchData = async () => {
		try {
			const response = await fetch(`http://localhost:3000/api/transaction/history/${UserLogin}`, {
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			});
			const data = await response.json();

			if (data.sentTransfers) {
				sentTransfers = data.sentTransfers;
			}

			if (data.receivedTransfers) {
				receivedTransfers = data.receivedTransfers;
			}
		} catch (error) {
			console.error(error);
		}
	};
	onMount(fetchData);

	onMount(() => {
		activeMenu = 'history';
	});
</script>

<Nav />
<div class="page-container">
	<Sidebar />
</div>
<div class="outClass">
	<div class="ml-64">
		<div class="transactions">
			<div class="last-tr">Последние транзакции</div>
			{#if sentTransfers && sentTransfers.length && receivedTransfers && receivedTransfers.length > 0}
				{#each sentTransfers as transfer}
					<p>
						{transfer.amount} to {transfer.recipientLogin} at {new Date(
							transfer.createdAt
					).toLocaleString('ru-RU', { timeZone: 'UTC' })}
					</p>
					<div class="line" />
				{/each}
				{#each receivedTransfers as transfer}
					<p>
						{transfer.amount} from {transfer.senderLogin} at {new Date(
							transfer.createdAt
					).toLocaleString('ru-RU', { timeZone: 'UTC' })}
					</p>
					<div class="line" />
				{/each}
			{:else}
				<p>No transfer history found.</p>
			{/if}
		</div>
	</div>
</div>


<style>

	.outClass{
		color: black;
	}
	.last-tr {
		font-size: 25px;
		padding-bottom: 10px;
	}
	.line {
		border-bottom: 1px solid #ffffff;
		padding: 0.3em;
		margin: 0.3em;
	}
	.transactions-wrapper {
		width: 55%;
		height: 100%;
	}
	.transactions {
		display: flex;
		color: black;
		flex-direction: column;
		justify-content: space-between;
		padding: 10px;
		border-radius: 10px;
		flex-grow: 1; /* Добавляем свойство flex-grow */
		text-align: center;
	}


	.transaction {
		margin-bottom: 10px;
	}
</style>