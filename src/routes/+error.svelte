<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
  <title>{page.error?.message}</title>
</svelte:head>

<div class="prose">
  <h1>{page.error?.message}</h1>
</div>
