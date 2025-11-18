<script>
	let { showModal = $bindable(), header, children } = $props();

	let dialog = $state();

	$effect(() => {
		if (showModal) dialog.showModal(); else dialog.close()
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
    class="radius-heavy border"
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => { if (e.target === dialog) dialog.close(); }}
>
	<div class="flexcolumn gap2 padding3">
		<div class="flexrow gap2 space-between">
            {@render header?.()}
            <div class="window-actions">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button class="transparent" onclick={() => {showModal=false}}>
                    <svg width=32 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="var(--font-secondary-color)" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="var(--font-primary-color)" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                </button>
            </div>
        </div>
        <div class="border-top"></div>
		{@render children?.()}
	</div>
</dialog>

<style>
	dialog {
		/* max-width: 48em; */
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}

    @media screen and (max-width: 720px) {
        dialog {
            max-height: unset !important;
            max-width: unset !important;
        }
        dialog[open] {
            position: fixed;
            width: 100vw;
            height: 100vh !important;
            border-radius: unset !important;
            border: unset !important;
		    animation: slide 0.5s;
        }
    }

	@keyframes slide {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0%);
		}
	}

</style>
