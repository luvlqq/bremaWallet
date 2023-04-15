<script>
    export let balance;

    let showModal = false;

    function toggleModal() {
        showModal = !showModal;
    }
</script>
<div class="balance-wrapper">
<div class="balance">
    <div class="balText">My balance</div>
    <div class="bal">{balance}</div>
    <button type="button" class="my-4 text-black bg-white hover:bg-purple-800 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 w-48 h-12" on:click={toggleModal}>Send</button>
    {#if showModal}
        <div class="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
        <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
            <div class="bg-white p-8 rounded-lg">
                <h2 class="text-lg font-medium mb-4 text-black text-center">Money Send</h2>
                <input type="text" class="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="User login">
                <input type="number" min="1" class="my-4 rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount">
                <div class="flex justify-center">
                    <button type="button" class="my-4 mr-5 px-4 bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none" on:click={toggleModal}>Close</button>
                    <button type="button" class="my-4 ml-5 px-4 bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none" on:click={toggleModal}>Send</button>
                </div>
            </div>

        </div>
    {/if}
</div>
</div>

<style>

    .balance {
        height: 20rem;
        width: 30rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(to bottom right, #772def, #a876e8);
        padding: 10px;
        border-radius: 10px;
        color: white;
    }
    .balText {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .bal {
        position: relative;
        font-size: 50px;
    }
</style>

