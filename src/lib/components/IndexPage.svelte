<script>
    export let cards = [];
</script>

<div class="flex flex-col justify-center my-5">
    <slot name="top"/>
    <div class="flex flex-col md:flex-row m-2 place-content-center">
        {#each cards as c}
            <a href="{c.href}" class="card card-compact w-full sm:w-96 m-1 bg-base-100 shadow-xl image-full 
            hover:bg-base-200 transition-all duration-200 hover:-translate-y-1">
                <div class="card-body">
                    <h2 class="card-title">{c.title}</h2>
                    <p>{c.text}</p>
                </div>
                <figure><img src="{c.src}" alt="{c.alt}" /></figure>
            </a>
        {/each}
    </div>
</div>
