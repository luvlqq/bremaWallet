<script>
    import { onMount } from "svelte";

    let text = "Auto typing text";

    let typedText = "";

    let isDeleting = false;

    let typingIdx = 0;

    let delay = 100;

    function startTyping() {
        onMount(() => {
            type();
        });
    }

    function type() {
        if (typingIdx < text.length) {
            typedText += text[typingIdx];
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
            $: setTimeout(type, 500);
        }
    }

    startTyping();
</script>

<style>
    .typing-text {
        font-size: 2rem;
        font-weight: bold;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        border-right: 0.15em solid #333;
        animation: typing 1s steps(30, end), blink-caret 0.5s step-end infinite;
    }

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

<div class="typing-text">{typedText}</div>
