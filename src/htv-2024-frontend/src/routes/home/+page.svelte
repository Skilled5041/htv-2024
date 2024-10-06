<script>
    import Card from "$lib/Card.svelte";

    const cardData = [
        {
            "name": "Ava Rivera",
            "keywords": "Building Community Gardens",
            "imageURL": "/images/garden.jpg"
        },
        {
            "name": "John Doe",
            "keywords": "Travelling to All 7 Continents",
            "imageURL": "/images/travel.jpeg"
        },
        {
            "name": "Jordan Bellamy",
            "keywords": "Reunite with Mom",
            "imageURL": "/images/reunite.jpg"
        },
        {
            "name": "Jane Smith",
            "keywords": "Open a Michelin Star Restaurant",
            "imageURL": "/images/michelin.jpg"
        },
        {
            "name": "Mary White",
            "keywords": "Go on an exchange",
            "imageURL": "/images/exchange.jpeg"
        },
    ];
</script>

<div class="flex flex-col items-center">
    <div class="grid ml-20 mr-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {#each cardData as card (card.name)}
            <Card
                    name={card.name}
                    keywords={card.keywords}
                    imageURL={card.imageURL}
            />
        {/each}
    </div>
</div>