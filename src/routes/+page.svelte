<script>
  import IndexPage from '$lib/components/IndexPage.svelte';
  let cards = [
    {
      title: 'Personal Website',
      text: 'Literally what you are looking at right now...',
      src: 'logo.png',
      alt: 'Website Logo',
      href: '/'
    },
    {
      title: 'Minesweeper',
      text: 'A classic puzzle game',
      src: 'media/minesweeper/mine-logo.png',
      alt: 'An explosive mine',
      href: '/games/minesweeper'
    }
  ];
</script>

<svelte:head>
  <title>Home | Aidan E. Jones</title>
</svelte:head>

<!--<IndexPage {cards}>
    <article slot="top" class="prose text-center md:text-left block">
        <h1>Welcome to my website!</h1>
        <p>Check out some of the stuff I've been working on</p>
    </article>
</IndexPage>-->

<div class="my-5 flex flex-col justify-center">
  <article class="prose block text-center md:text-left">
    <h1>Welcome to my website!</h1>
    <p>Check out some of the stuff I've been working on</p>
  </article>
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
