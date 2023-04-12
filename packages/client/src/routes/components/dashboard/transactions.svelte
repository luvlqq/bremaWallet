<script>
    export let transactions;
</script>

<div class="transactions-wrapper">
    <div class="transactions">
        <h2>Последние транзакции</h2>
        {#each transactions as transaction}
            <div class="transaction">
                <p>{transaction.amount} ({transaction.type})</p>
                <p>{transaction.date}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    .transactions-wrapper {
        width: 15%;
        height: 100%;
        margin-right: 20px;
    }
    .transactions {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #772def;
        padding: 10px;
        border-radius: 10px;
        color: white;
        flex: 1;
    }
    .transaction {
        margin-bottom: 10px;
    }
</style>

