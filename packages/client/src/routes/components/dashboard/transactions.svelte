<script>
    import { UserData } from '../auth/login.service';
    import {get} from "svelte/store";
    import {onMount} from "svelte";

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

</script>

<div class="transactions-wrapper">
	<div class="transactions">
		<div class="last-tr">Последние транзакции</div>
        {#if sentTransfers && sentTransfers.length && receivedTransfers && receivedTransfers.length > 0}
            {#each sentTransfers.slice(0,5) as transfer}
                <li>{transfer.amount} to {transfer.recipientLogin} at {new Date(transfer.createdAt).toLocaleString('ru-RU', { timeZone: 'UTC' })}</li>
            {/each}
            {#each receivedTransfers.slice(0,5) as transfer}
                <li>{transfer.amount} from {transfer.senderLogin} at {new Date(transfer.createdAt).toLocaleString('ru-RU', { timeZone: 'UTC' })}</li>
            {/each}
        {:else}
            <p>No transfer history found.</p>
        {/if}
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
