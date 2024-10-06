<script>
    import Card from "$lib/Card.svelte";
    import { backend } from "$lib/canisters";

    let cardData = []
    const fetchCards = async () => {
        // cardData = await backend.getAllPostSnapshots();
    }
    // fetchCards();
</script>

<div class="flex flex-col items-center">
    <div class="grid ml-24 mt-24 mr-24 gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {#each cardData as card (card.name)}
            <Card
                    name={card.title}
                    keywords={card.description.substring(0, 25).concat("...")}
                    imageURL={URL.createObjectURL(card.images[0])}
            />
        {/each}
    </div>
</div>