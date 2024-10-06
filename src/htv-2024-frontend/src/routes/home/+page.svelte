<script>
    import Card from "$lib/Card.svelte";
    import { backend } from "$lib/canisters";
    import { onMount } from "svelte";

    let cardData = [];
    const fetchCards = async () => {
        cardData = await backend.getAllPostSnapshots();
    };

    onMount(async () => {
        fetchCards().then(() => {
            console.log(cardData);
        });
        cardData.sort((a, b) => {
            return b.likes - a.likes;
        });
    });

    function uint8ArrayToImageUrl(uint8Array) {
        const blob = new Blob([uint8Array], { type: 'image/jpeg' }); // Adjust the MIME type as needed
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
    }
</script>

<div class="flex flex-col items-center">
    <h1 class="mt-24 text-9xl font-bold gradient-animation">Dream With Us</h1>
    <div class="grid ml-24 mt-24 mr-24 gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {#if cardData.length === 0}
            <p>Loading...</p>
        {:else }
            {#each cardData as card}
                <Card
                        title={card.title}
                        description={card.description.substring(0, 25).concat("...")}
                        image={uint8ArrayToImageUrl(card.images[0])}
                        id={card.id}
                />
            {/each}
        {/if}
    </div>
</div>

<style>

    .gradient-animation {
        opacity: 0;
        background: linear-gradient(to right, #8e257d 25%, #ec1e79 50%, #56A8B9 75%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
        background-size: 500% auto;
        animation:
                textShine 5s ease-in-out infinite alternate,
                reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s;
        display: inline-block;
        animation-fill-mode: both;
    }


    @keyframes textShine {
        0% {
            background-position: 0 50%;
        }
        100% {
            background-position: 100% 50%;
        }
    }

    @keyframes reveal {
        0% {
            opacity: 0;
            transform: translateY(100%);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>