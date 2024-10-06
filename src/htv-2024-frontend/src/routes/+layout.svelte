<script lang="ts">
	import "../app.css";
</script>

<main>
	<nav class="p-4 bg-slate-300">
		<div>
			<ul class="flex justify-end gap-7">
				<li>
					<a href="/home">Home</a>
				</li>
				<li>
					<a href="/posts">Posts</a>
				</li>
			</ul>
		</div>
	</nav>
</main>

<slot />
