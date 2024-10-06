<script>
    export let title = "Default Title";
    export let description = "Default description";
    export let image = "https://via.placeholder.com/150";
    export let id = -1;
</script>
<a href="/posts?post_id={id}">
    <main class="max-w-96 h-56 outline outline-neutral-200 shadow-xl rounded-lg bg-slate-50 w-80 hover:scale-105 duration-300">
        <img src={image} alt="Card" class="w-full h-32 object-cover rounded-t-lg"/>
        <div class="flex items-center justify-between">
            <div>
                <h3 class="ml-4 mt-4">{title}</h3>
                <h5 class="ml-4">{description}</h5>
            </div>
        </div>
    </main>
</a>
