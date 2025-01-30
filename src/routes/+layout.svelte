<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  let { children } = $props<{ children: import('svelte').Snippet }>();
  let navlinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    [
      { name: 'Games', href: '/games' },
      { name: 'Minesweeper', href: '/games/minesweeper' }
    ]
  ];

  onMount(async () => {
    const pkg = await import('theme-change');
    pkg.themeChange(false);
  });
</script>

{#snippet navlink(nl: (typeof navlinks)[0])}
  {#if Array.isArray(nl)}
    <li>
      <details class="dropdown">
        <summary>{nl[0].name}</summary>
        <ul class="menu dropdown-content z-[15] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
          <li><strong><a href={nl[0].href}>{nl[0].name}</a></strong></li>
          {#each nl as n, i}
            {#if i !== 0}
              <li><a href={n.href}>{n.name}</a></li>
            {/if}
          {/each}
        </ul>
      </details>
    </li>
  {:else}
    <li><a href={nl.href}>{nl.name}</a></li>
  {/if}
{/snippet}

<div class="flex h-screen flex-col">
  <div class="navbar bg-base-200">
    <!--not large screens-->
    <div class="navbar-start">
      <details class="dropdown lg:hidden">
        <summary class="btn btn-square btn-ghost">
          <span class="fa fa-navicon btn btn-ghost"></span>
        </summary>
        <ul class="menu dropdown-content z-[15] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
          {#each navlinks as nl}
            {@render navlink(nl)}
          {/each}
        </ul>
      </details>
      <span class="text-xl normal-case">AEJ</span>
    </div>
    <!--large screens-->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal p-0">
        {#each navlinks as nl}
          {@render navlink(nl)}
        {/each}
      </ul>
    </div>
    <div class="navbar-end">
      <select data-choose-theme class="select">
        <option value="emerald">Light</option>
        <option value="forest">Dark</option>
      </select>
    </div>
  </div>

  <!--Nav End-->
  <main class="flex-grow bg-base-100 p-2">
    <div class="container mx-auto">{@render children?.()}</div>
  </main>
  <footer class="footer footer-center bg-neutral p-10 text-neutral-content">
    <p>&copy;2022 Aidan E. Jones</p>
  </footer>
</div>
