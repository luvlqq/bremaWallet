<script>
	export let transactions;
</script>

<div class="transactions-wrapper">
	<div class="transactions">
		<div class="last-tr">Последние транзакции</div>
		{#each transactions as transaction}
			<div class="transaction my-2">
				<p>{transaction.amount} ({transaction.type})</p>
				<p>{transaction.date}</p>
			</div>
			<div class="line" />
		{/each}
	</div>
</div>

<style>
	.last-tr {
		font-size: 25px;
		padding-bottom: 10px;
	}
	.line {
		border-bottom: 1px solid #ffffff;
	}
	.transactions-wrapper {
		width: 55%;
		height: 100%;
	}
	.transactions {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-image: linear-gradient(to top left, #772def, #a876e8);
		padding: 10px;
		border-radius: 10px;
		color: white;
		flex: 1;
		text-align: center;
		max-height: 500px; /* задаем максимальную высоту блока */
		max-width: 500px;
	}

	.transaction {
		margin-bottom: 10px;
	}
</style>
