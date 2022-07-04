<script>
	import '../app.css';
	let navlinks = [
		{name:"Home",href:"/"},
		{name:"About",href:"/about"},
		[
			{name:"Games",href:"/games"},
			{name:"Minesweeper",href:"/games/minesweeper"}
		]
	];
</script>

<div class="flex flex-col h-screen">
	<div class="navbar bg-base-200">
		<!--not large screens-->
		<div class="navbar-start">
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost btn-square lg:hidden">
					<input type="checkbox" class="hidden">
					<span class="btn btn-ghost lg:hidden fa fa-navicon"></span>
				</label>
				<ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
					{#each navlinks as nl}
						{#if Array.isArray(nl)}
							<li tabindex="0">
								<p>{nl[0].name}<i class="fa fa-angle-down"></i></p>
								<ul class="p-2 bg-base-100 shadow-sm">
									<li><strong><a href="{nl[0].href}">{nl[0].name}</a></strong></li>
									{#each nl as n, i}
										{#if i !== 0}
											<li><a href="{n.href}">{n.name}</a></li>
										{/if}
									{/each}
								</ul>
							</li>
						{:else}
							<li><a href="{nl.href}">{nl.name}</a></li>
						{/if}
					{/each}
				</ul>
			</div>
			<span class="normal-case text-xl ">AEJ</span>
		</div>
		<!--large screens-->
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal p-0">
			{#each navlinks as nl}
				{#if Array.isArray(nl)}
					<li tabindex="0">
						<p>{nl[0].name}<i class="fa fa-angle-down"></i></p>
						<ul class="p-2 bg-base-100 shadow-sm">
							<li><strong><a href="{nl[0].href}">{nl[0].name}</a></strong></li>
							{#each nl as n, i}
								{#if i !== 0}
									<li><a href="{n.href}">{n.name}</a></li>
								{/if}
							{/each}
						</ul>
					</li>
				{:else}
					<li><a href="{nl.href}">{nl.name}</a></li>
				{/if}
			{/each}
			</ul>
		</div>
		<div class="navbar-end"></div>
	</div>
	<main class="p-2 flex-grow bg-base-100">
		<div class="container mx-auto "><slot></slot></div>
	</main>
	<footer class="footer footer-center p-10 bg-neutral text-neutral-content">
		<p>&copy;2022 Aidan E. Jones</p>
	</footer>
</div>
