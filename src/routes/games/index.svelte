<script>
    import IndexPage from '$lib/components/IndexPage.svelte';
    let cards = [
        {
            title:"Minesweeper", 
            text:"A classic puzzle game",
            src:"media/minesweeper/mine-logo.png",
            alt:"An explosive mine",
            href:"/games/minesweeper"
        }];
</script>

<svelte:head>
    <title>Games | Aidan E. Jones</title>
</svelte:head>

<IndexPage {cards}>
    <article slot="top" class="prose text-center md:text-left block">
        <h1>Games</h1>
        <p>Some simple games I programmed that can be played in the browser.</p>
    </article>
</IndexPage>