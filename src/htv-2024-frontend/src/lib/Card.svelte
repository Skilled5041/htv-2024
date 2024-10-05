<script>
    export let name = "Default name";
    export let keywords = "Default keywords"
    export let imageURL = "/images/garden.jpg";
</script>

<main class="mt-8 ml-4 max-w-96 h-56 outline rounded-lg bg-slate-50">
    <img src={imageURL} alt="Card" class="w-full h-32 object-cover rounded-t-lg"/>
    <div class="flex items-center justify-between">
        <div>
            <h3 class="ml-4 mt-4">{name}</h3>
            <h5 class="ml-4">{keywords}</h5>    
        </div>
        <div class="flex justify-center items-center h-16">
            <span class="mr-10 dot text-2xl items-center">
                <div class="ml-1.5">
                    &rarr;
                </div>
            </span>
        </div>
    </div>
</main>

<style>
.dot {
    height: 35px;
    width: 35px;
    background-color: #FF9B54;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
}
</style>