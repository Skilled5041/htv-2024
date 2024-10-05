<script>
  import { backend } from "$lib/canisters";

  function onClick() {
    backend.createPost([], "title", "description", "creator name");
    console.log("created post");
  }
</script>

<main>
  <img src="/logo2.svg" alt="DFINITY logo" />
  <br />
  <br />
  <button on:click={onClick}>Click Me!</button>
</main>