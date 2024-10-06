<script>
    import { backend } from "$lib/canisters";
    import { goto } from "$app/navigation";

    let fileInput;

    async function handleSubmit(event) {
        event.preventDefault();
        const file = fileInput.files[0];
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        await backend.createPost([uint8Array], event.target.title.value, event.target.description.value, event.target.fname.value, event.target["ltc-wallet"].value);
        goto("/home");
    }
</script>

<main class="h-[90vh] flex items-center justify-center">
    <div class="flex justify-center w-[30%] bg-neutral-50 border-2 border-neutral-100 rounded-2xl p-12">
        <form class="flex flex-col w-[80%]" on:submit={handleSubmit}>
            <label for="fname" class="block mb-2 text-3xl">Full Name</label>
            <input type="text" id="fname" name="fname" class="border rounded-xl p-2 mb-4" required />
            <label for="title" class="block mb-2 text-3xl pt-12">Title</label>
            <input type="text" id="title" name="title" class="border rounded-xl p-2 mb-4" required />
            <label for="description" class="block mb-2 text-3xl pt-12">Description</label>
            <textarea id="description" name="description" class="border rounded-xl p-2 mb-4" required></textarea>
            <label for="ltc-wallet" class="block mb-2 text-3xl pt-12">LTC Wallet</label>
            <input type="text" id="ltc-wallet" name="ltc-wallet" class="border rounded-xl p-2 mb-4" required />
            <label class="p-4 mt-12 rounded-xl text-xl text-white border-neutral-50 border-2 bg-[#3B00B9] cursor-pointer hover:bg-[#2f0785] hover:scale-105 duration-200" for="thumbnail">Choose a thumbnail:</label>
            <input required type="file" id="thumbnail" name="thumbnail" accept="image/png, image/jpeg" bind:this={fileInput} />
            <button class="inline-block p-2 bg-[#C5414E] text-white rounded-xl mt-8 py-4 hover:scale-105 hover:bg-[#9e2f3b] duration-200" type="submit">Submit</button>
        </form>
    </div>
</main>

<style>
    input[type="file"] {
        display: none;
    }
</style>