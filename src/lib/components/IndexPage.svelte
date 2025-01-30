<script>
  /** @type {{cards?: any, top?: import('svelte').Snippet}} */
  let { cards = [], top } = $props();
</script>

<div class="my-5 flex flex-col justify-center">
  {@render top?.()}
  <div class="m-2 flex flex-col place-content-center md:flex-row">
    {#each cards as c}
      <a
        href={c.href}
        class="card image-full card-compact m-1 w-full bg-base-100 shadow-xl transition-all
            duration-200 hover:-translate-y-1 hover:bg-base-200 sm:w-96"
      >
        <div class="card-body">
          <h2 class="card-title">{c.title}</h2>
          <p>{c.text}</p>
        </div>
        <figure><img src={c.src} alt={c.alt} /></figure>
      </a>
    {/each}
  </div>
</div>
