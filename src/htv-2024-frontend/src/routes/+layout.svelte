<script lang="ts">
    import "../app.css";
</script>


<nav class="p-6 bg-[#3B00B9]">
    <div class="flex justify-between">
        <a class="text-4xl text-white text-center" href="/posts/new">+</a>
        <div class="flex gap-7 text-white">
            <a class="text-xl" href="/home">Home</a>
        </div>
    </div>
</nav>

<slot/>
