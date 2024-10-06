<script lang="ts">
    import "../app.css";
</script>


<nav class="p-6 bg-[#3B00B9]">
    <div>
        <ul class="flex justify-end gap-7 text-white">
            <li>
                <a class="text-xl" href="/home">Home</a>
            </li>
            <li>
                <a class="text-xl" href="/posts">Posts</a>
            </li>
        </ul>
    </div>
</nav>

<slot/>
