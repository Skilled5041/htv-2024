<script lang="ts">
    import banner from "$lib/images/banner.jpg";
    import { Confetti } from "svelte-confetti";
    // TODO use query params
    const getImages = async () => {
        const data = await fetch("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg");
        const image = await data.blob();
        return URL.createObjectURL(image);
    };

    let postInfo = {
        images: [getImages().then((res) => res ?? [])],
        funding_amount: 123,
        likes: 243,
        title: "Terraforming a Whole New Planet—In Just One Year",
        description: "Here’s the dream: take a barren, lifeless planet light-years away, and turn it into a lush, thriving paradise—in just one year. I’m talking about oceans, forests, and cities springing up overnight, powered by an army of self-replicating nanobots that can transform the surface of the planet in real-time. We’ll upload consciousness into avatars that can withstand the extreme conditions while the planet shifts from desolate to divine. Imagine a world where you could stroll on beaches made of stardust, skyscrapers made of diamond-like materials, and bioluminescent forests that glow in the dark. This isn’t just terraforming; it’s creating a utopia from scratch, faster than anyone thought possible. With your support, we could unlock the technology to make this dream a reality—and give humanity its first fully customizable planet!"
    };

    let liked = false;
    const handleLike = () => {
        liked = !liked;
        console.log(liked);
    };
</script>

<div>
    <img src={banner} alt="Banner" class="w-full h-auto object-cover max-h-48 object-center"/>
    <div class="flex w-full min-h-[80vh]">
        <div class="w-[75%] flex flex-col items-center p-4">
            <h1 class="text-center pt-16 text-6xl max-w-[65%] font-semibold leading-normal">{postInfo.title}</h1>
            {#await postInfo.images[0]}
                <p>Loading...</p>
            {:then image}
                <img src={image} alt="Post Image"
                     class="w-1/2 max-w-screen-lg h-auto object-cover object-center pt-36"/>
            {:catch error}
                <p>{error.message}</p>
            {/await}
            <p class="w-[50%] text-2xl pt-16 leading-10">{postInfo.description}</p>
        </div>
        <div class="border-l-2 border-neutral-200 p-4 flex flex-col items-center w-[25%]">
            <button class="text-3xl mt-16 bg-[#3B00B9] text-white p-4 rounded-2xl hover:bg-[#2f0785] hover:scale-110 duration-200">
                Support
            </button>
            <div class="flex">
                <h1 class="mt-16 text-3xl font-bold">
                    Money Raised:
                </h1>
                <h1 class="ml-3 mt-16 text-3xl font-bold bg bg-gradient-to-r text-center from-[#912380] via-[#F05A24] to-[#29AAE1] text-transparent bg-clip-text">
                    {postInfo.funding_amount} ICP
                </h1>
            </div>
            {#if liked}
                <div class="relative top-24 z-50">
                    <Confetti amount={50} size={20} delay={[0, 1000, 2000]} xSpread={0.1} cone/>
                </div>
            {/if}
            <button class="pt-12" on:click={handleLike}>
                <div class="flex gap-2 items-center py-4 px-6 border-4 rounded-full shadow-red-200 shadow-2xl hover:bg-neutral-50 hover:scale-105 duration-150 active:scale-90">
                    {#if liked}
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" {...$$props}>
                            <path fill="red"
                                  d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"/>
                        </svg>
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" {...$$props}>
                            <path fill="red"
                                  d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"/>
                        </svg>
                    {/if}
                    <h1 class="text-3xl">{postInfo.likes}</h1>
                </div>
            </button>
        </div>
    </div>
</div>