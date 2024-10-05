<script lang="ts">
    import banner from "$lib/images/banner.jpg";
    import Icon from "@iconify/svelte";
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
        <div class="w-[80%] flex flex-col items-center p-4">
            <h1 class="text-center pt-16 text-6xl max-w-[65%] font-semibold leading-normal">{postInfo.title}</h1>
            {#await postInfo.images[0]}
                <p>Loading...</p>
            {:then image}
                <img src={image} alt="Post Image" class="w-1/2 max-w-screen-lg h-auto object-cover object-center pt-36"/>
            {:catch error}
                <p>{error.message}</p>
            {/await}
            <h1 class="w-[50%] text-2xl pt-16 leading-10">{postInfo.description}</h1>
        </div>
        <div class="border-l-2 border-neutral-200 p-4 flex flex-col items-center w-[25F%]">
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
            <button class="pt-12" on:click={handleLike}>
                <div class="flex gap-2 items-center">
                    {#if liked}
                        <Icon icon="mdi:heart" class="text-4xl text-red-600"/>
                    {:else}
                        <Icon icon="mdi:heart-outline" class="text-4xl text-red-600"/>
                    {/if}
                    <h1 class="text-3xl">{postInfo.likes}</h1>
                </div>
            </button>
        </div>
    </div>
</div>