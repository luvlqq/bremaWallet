<script>
    export let transactions;
</script>

<div class="transactions-wrapper">
    <div class="transactions">
        <div class="last-tr">Последние транзакции</div>
        {#each transactions as transaction}
            <div class="transaction">
                <p>{transaction.amount} ({transaction.type})</p>
                <p>{transaction.date}</p>
            </div>
            <div class="line"></div>
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
        width: 25%;
        height: 100%;

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
        text-align: center;
    }
    .transaction {
        margin-bottom: 10px;
    }
</style>

