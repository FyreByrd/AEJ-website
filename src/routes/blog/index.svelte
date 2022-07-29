<script context="module">
    export const load = async ({ fetch }) => {
        const posts = await fetch('/api/posts.json')
        const allPosts = await posts.json()
    
        return {
            props: {
                posts: allPosts
            }
        }
    }
</script>
<script>
    /*
    https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog
    https://fantinel.dev/blog-development-sveltekit/
    https://mdsvex.com
    https://svelteland.github.io/svelte-kit-blog-demo/create-your-blog/
    */
    export let posts;
</script>
<ul class="prose">
    {#each posts as post}
      <li>
        <h2>
          <a href={post.path}>
            {post.meta.title}
          </a>
        </h2>
        Published {post.meta.date}
      </li>
    {/each}
</ul>