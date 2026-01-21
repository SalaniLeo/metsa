<script lang="ts">
	import Sidebar from './../lib/components/sidebar.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import type { coordinates } from '$lib/components/templates/interfaces.js';

	type PageData = {
		coordinates: coordinates,
	}

	let { children } = $props() as { children: any; data: PageData };
	let showsidebar = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="wrapper">
	<div class="flexrow gap2 vexpand">
		<Sidebar bind:showsidebar></Sidebar>
		<div class="flexcolumn hexpand scroll">
			<div class="padding2 border-bottom bg-terthiary topBar valign hide-desktop show-mobile">
				<div class="flexrow">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<svg
						onclick={() => {
							showsidebar = !showsidebar;
						}}
						class="pointer"
						width="32"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<path
								d="M11 5V19M6 8H8M6 11H8M6 14H8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
								stroke="var(--font-primary-color)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
						</g>
					</svg>
					<div class="hendalign valign flexrow gap2 hexpand">
						<!-- <img src={favicon} width="28px" alt="appicon" /> -->
						<!-- <h3>metsa</h3> -->
					</div>
				</div>
			</div>
			{@render children()}
		</div>
	</div>
</div>

<style>
	.topBar {
		position: sticky;
		top: 0;
		z-index: 1;
	}
	.wrapper {
		padding: 0 !important;
		height: 100vh;
		width: 100vw;
	}
</style>
