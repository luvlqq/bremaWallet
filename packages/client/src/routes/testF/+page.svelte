<script>
    let showModal = false;

    function toggleModal() {
        showModal = !showModal;
    }
</script>

<button type="button" class="my-4 text-black bg-white hover:bg-purple-800 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 w-48 h-12" on:click={toggleModal}>Send</button>

{#if showModal}
    <div class="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
    <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
        <div class="bg-white p-8 rounded-lg">
            <h2 class="text-lg font-medium mb-4">Modal Title</h2>
            <p class="mb-4">Modal content goes here</p>
            <button type="button" class="bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none" on:click={toggleModal}>Close</button>
        </div>
    </div>
{/if}
