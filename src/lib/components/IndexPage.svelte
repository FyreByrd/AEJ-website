<script>
    export let cards = [];
</script>

<div class="flex flex-col justify-center px-2 my-5">
    <slot name="top"></slot>
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
