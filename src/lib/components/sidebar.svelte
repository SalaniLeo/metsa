<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { showsidebar = $bindable() } = $props();

	let ar = ['NAV', 'DIV'];

	function showsidebarHandler(action: any) {
		if (!ar.includes(action['target'].nodeName)) {
			showsidebar = false;
		} else if (Object.values(action['target'].classList).includes('hidesidebar')) {
			showsidebar = false;
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
{#if showsidebar}
	<div class="hidesidebar sidebar_overlay" onclick={showsidebarHandler}></div>
{/if}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="hidesidebar flexrow wrapper vexpand" class:showsidebar onclick={showsidebarHandler}>
	<nav class="space-between flexcolumn vexpand">
		<div class="flexcolumn valign gap4 padding4 vexpand">
			<div class="halign valign flexrow gap2">
				<img src={favicon} width="32px" alt="appicon" />
				<h1>metsa</h1>
			</div>
			<div class="border-top hexpand"></div>
			<div class="content flexcolumn gap4 hexpand vexpand">
				<div class="shortcuts flexcolumn gap4 halign valign hexpand">
					<div class="flexrow gap2 vendalign hexpand">
						<a href="/" class="flexrow gap2 vendalign hexpand">
							<svg width="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
								><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
									id="SVGRepo_tracerCarrier"
									stroke-linecap="round"
									stroke-linejoin="round"
								></g><g id="SVGRepo_iconCarrier">
									<path
										d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
										stroke="var(--font-primary-color)"
										stroke-width="1.5"
									></path>
									<path
										d="M15 18H9"
										stroke="var(--font-secondary-color)"
										stroke-width="1.5"
										stroke-linecap="round"
									></path>
								</g></svg
							>
							<h3>Home</h3></a>
						</div>
						<a class="flexrow gap2 vendalign hexpand" href="/satellite">
							<svg width=24px fill="var(--font-secondary-color)" viewBox="0 0 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M5.49,79.09l37.86,37.86C66.37,99.1,36.69,54.35,5.49,79.09L5.49,79.09z M42.39,62.21l18.29,18.29 c1.18,1.18,3.12,1.18,4.3,0l24.2-24.2c6.21-6.21,6.21-16.38,0-22.59v0c-6.21-6.21-16.38-6.21-22.59,0l-24.2,24.2 C41.2,59.09,41.2,61.02,42.39,62.21L42.39,62.21z M24.5,104.83L20.33,109c-1.48,1.48-3.89,1.48-5.38,0c-1.48-1.49-1.48-3.89,0-5.38 l4.17-4.17l-17-17l0.01-0.01c-0.13-0.13-0.25-0.26-0.36-0.4C0.15,80,0.49,77.01,2.54,75.38c13.15-10.43,26.24-10.1,36.28-4.46 c1.85,1.04,3.59,2.26,5.2,3.64l1.99-1.99l-6.99-6.99c-1.52-1.52-2.28-3.52-2.28-5.51c0-1.99,0.76-3.99,2.28-5.51l5.92-5.92 l-5.11-5.11l-3.76,3.76h0c-1.22,1.22-2.83,1.84-4.44,1.84c-1.59,0-3.19-0.61-4.42-1.84l-0.01-0.01l-0.01,0.01h0L3.53,23.62 c-1.22-1.22-1.84-2.83-1.84-4.44c0-1.59,0.62-3.19,1.85-4.43l-0.01-0.01L16.44,1.84l0,0c0.16-0.16,0.33-0.31,0.51-0.44 C18.09,0.47,19.48,0,20.87,0c1.59,0,3.19,0.61,4.42,1.84l0.01,0.01l0.01-0.01l0,0L48.97,25.5v0c1.22,1.22,1.84,2.83,1.84,4.44 c0,1.6-0.61,3.21-1.84,4.44v0l-3.77,3.77l5.11,5.11l12.91-12.91c4.03-4.03,9.35-6.05,14.66-6.05c5.31,0,10.62,2.02,14.66,6.05v0 c4.03,4.03,6.05,9.35,6.05,14.66c0,5.31-2.02,10.62-6.05,14.66L79.63,72.56l5.11,5.11l3.77-3.76c1.22-1.22,2.83-1.84,4.44-1.84 c1.6,0,3.21,0.61,4.44,1.84l23.66,23.66l0,0c1.22,1.22,1.84,2.83,1.84,4.44c0,1.6-0.61,3.21-1.84,4.44l0,0l-12.91,12.91 c-1.22,1.22-2.83,1.84-4.44,1.84c-1.6,0-3.21-0.61-4.44-1.84L75.6,95.69c-1.22-1.22-1.84-2.83-1.84-4.44 c0-1.59,0.61-3.19,1.84-4.42l0.01-0.01l-0.01-0.01l3.76-3.77l-5.11-5.11l-5.92,5.92c-1.52,1.52-3.52,2.28-5.51,2.28 c-1.99,0-3.99-0.76-5.51-2.28l-5.92-5.92l-2.15,2.15c2.47,3.26,4.37,6.93,5.57,10.75c3.27,10.41,1.4,21.91-8.23,29.61 c-1.86,1.73-4.78,1.68-6.59-0.13L24.5,104.83L24.5,104.83z M0.13,106.96c-0.53-1.89,0.57-3.86,2.47-4.39 c1.89-0.53,3.86,0.57,4.39,2.47c1,3.53,2.38,6.2,4.16,7.99c1.6,1.61,3.6,2.53,6.03,2.73c1.96,0.16,3.42,1.88,3.26,3.85 c-0.16,1.96-1.88,3.42-3.85,3.26c-4.17-0.36-7.65-1.98-10.48-4.83C3.45,115.38,1.47,111.67,0.13,106.96L0.13,106.96z"></path> </g> </g></svg>
							<h3>Maps</h3>
						</a>
						<a class="flexrow gap2 vendalign hexpand valign" href="/lightnings">
							<svg width=24 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.55563 13.3232L9.43584 13.3123C7.90803 13.1735 7.14412 13.104 6.90146 12.5814C6.65881 12.0588 7.09869 11.4304 7.97846 10.1736L11.5612 5.05544C12.1424 4.22517 12.433 3.81003 12.6836 3.89831C12.9342 3.98658 12.9005 4.4922 12.8331 5.50343L12.6299 8.55194C12.5685 9.47214 12.5379 9.93224 12.8023 10.2419C13.0667 10.5515 13.5259 10.5933 14.4444 10.6768L14.5642 10.6877C16.092 10.8265 16.8559 10.896 17.0985 11.4186C17.3412 11.9412 16.9013 12.5696 16.0215 13.8264L12.4388 18.9446C11.8576 19.7748 11.567 20.19 11.3164 20.1017C11.0658 20.0134 11.0995 19.5078 11.1669 18.4966L11.3701 15.4481C11.4315 14.5279 11.4621 14.0678 11.1977 13.7581C10.9333 13.4485 10.4741 13.4067 9.55563 13.3232Z" stroke="var(--font-secondary-color)"></path> <path d="M18.5 4L17 6H19L17.5 8" stroke="var(--font-secondary-color)" stroke-opacity="0.24" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.5 16L5 18H7L5.5 20" stroke="var(--font-secondary-color)" stroke-opacity="0.24" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>							<h3>Lightnings</h3>
						</a>
					<div class="flexcolumn gap3">
						
					</div>
				</div>
			</div>
			<div class="border-top hexpand"></div>
			<div class="flexcolumn gap2 hexpand valign">
				<a href="/settings" class="flexrow gap2 hexpand valign">
					<svg width=24 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3" stroke="var(--font-primary-color)" stroke-width="1.5"></circle> <path opacity="0.5" d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="var(--font-primary-color)" stroke-width="1.5"></path> </g></svg>
					Settings
				</a>
			</div>
		</div>
	</nav>
</div>

<style>
	nav {
        z-index: 3;
		border-right: 1px solid var(--outline-color);
	}
	@media screen and (max-width: 720px) {
		.sidebar_overlay {
			position: fixed;
			background-color: rgba(0, 0, 0, 0.555);
			width: 100vw;
			height: 100vh;
			transform: translateX(0%) !important;
			transition-duration: 0.25s;
		}
		.wrapper {
			z-index: 3;
			transform: translateX(-100%);
			position: absolute;
			transition-duration: 0.5s !important;
			background-color: var(--shadow-color-medium);
		}
		nav {
			width: min-content !important;
		}
		.showsidebar {
			display: unset !important;
			transform: translateX(0%);
			/* height: 100% !important; */
		}
	}
</style>
