<script>
    export let balance;
</script>

<div class="balance">
    <div class="balText">Баланс</div>
    <div class="bal">{balance}</div>
</div>

<style>
    .balance {
        width: 10rem;
        height: 10rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #772def;
        padding: 10px;
        margin-left: 3rem;
        border-radius: 10px;
        color: white;
        text-align: center;
    }

    .balance:hover{
        background-color: #8a49f3;
    }

    .balText {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .bal {
        position: relative;
        font-size: xx-large;
    }
</style>

