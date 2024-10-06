<script>
    export let name = "Default name";
    export let keywords = "Default keywords"
    export let imageURL = "/images/garden.jpg";
</script>

<main class="max-w-96 h-56 outline outline-neutral-200 shadow-xl rounded-lg bg-slate-50 w-80 hover:scale-105 duration-300">
    <img src={imageURL} alt="Card" class="w-full h-32 object-cover rounded-t-lg"/>
    <div class="flex items-center justify-between">
        <div>
            <h3 class="ml-4 mt-4">{name}</h3>
            <h5 class="ml-4">{keywords}</h5>    
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