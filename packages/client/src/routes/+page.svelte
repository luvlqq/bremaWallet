<script>
    import { onMount } from "svelte";

    let arrWords = ['all','everyone','everywhere','you','every person','the general public','the masses','the whole world','each and every one of us', 'all and sundry']

    let typedText = "";

    let isDeleting = false;

    let typingIdx = 0;

    let delay = 100;

    function getRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    let finRes = getRandomElement(arrWords);

    function startTyping() {
        onMount(() => {
            type();
        });
    }

    function type() {
        if (typingIdx < finRes.length) {
            typedText += finRes[typingIdx];
            typingIdx++;
            delay = isDeleting ? 50 : 100;
            $: setTimeout(type, delay);
        } else {
            $: setTimeout(deleteText, 1500);
        }
    }

    function deleteText() {
        if (typedText.length > 0) {
            typedText = typedText.slice(0, typedText.length - 1);
            delay = isDeleting ? 50 : 100;
            $: setTimeout(deleteText, delay);
        } else {
            typingIdx = 0;
            isDeleting = false;
            finRes = getRandomElement(arrWords); // изменение слова после удаления
            $: setTimeout(type, 500);
        }
    }

    startTyping();
</script>

<style>
    @keyframes typing {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    @keyframes blink-caret {
        from,
        to {
            border-color: transparent;
        }
        50% {
            border-color: #333;
        }
    }
</style>

<svelte:head>
    <title>BREMA Wallet</title>
</svelte:head>
<div class="flex flex-col items-center justify-center h-screen mt-n50">
    <h1 class="text-7xl text-[#a413f2] font-bold outline-none my-8">
        <div style="background: linear-gradient(to right, #9737e6, #C55BD5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradient 5s ease infinite;">BREMA WALLET</div>
    </h1>

    <p class="mt-5 text-2xl">
        Wallet with features for <span style="color: #a413f2;">{typedText}</span>
    </p>

    <div class="mt-10">
        <form action="/auth">
            <button class="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
                log In
            </button>
        </form>
    </div>

</div>
