<script>
    import IndexPage from '$lib/components/IndexPage.svelte';
    let cards = [
        {
            title:"Personal Website", 
            text:"Literally what you are looking at right now...",
            src:"logo.png",
            alt:"Website Logo",
            href:"/"
        },
        {
            title:"Minesweeper", 
            text:"A classic puzzle game",
            src:"media/minesweeper/mine-logo.png",
            alt:"An explosive mine",
            href:"/games/minesweeper"
        }];
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

<div class="flex flex-col justify-center px-2 my-5">
    <article class="prose text-center md:text-left block">
        <h1>Welcome to my website!</h1>
        <p>Check out some of the stuff I've been working on</p>
    </article>
    <div class="flex flex-col md:flex-row m-2 place-content-center">
        {#each cards as c}
            <a href="{c.href}" class="card card-compact w-96 bg-base-100 shadow-xl 
            hover:bg-base-200 transition-all duration-200 hover:-translate-y-1">
                <div class="card-body">
                    <h2 class="card-title">{c.title}</h2>
                    <p>{c.text}</p>
                </div>
                <figure class="bg-base-200"><img src="{c.src}" alt="{c.alt}" /></figure>
            </a>
        {/each}
    </div>
</div>
