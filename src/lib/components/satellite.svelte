<script lang="ts">
	import { weatherFuncs } from "$lib/weatherData.svelte";
	import { writable } from "svelte/store";


    let url = $state("https://imn-rust-lb.infoplaza.io/v4/nowcast/tiles/satellite-europe/{DATE}/7/44/65/51/72?outputtype=jpeg");
    let urls: any = $state([]);
    let date = $state()
    let playing = writable(false);
    let interval: any = $state()

    playing.subscribe((value) => {
        if(value) {
            interval = setInterval(() => {
                rangeValue = (rangeValue + 1) % 48;
            }, 500);
        } else {
            if(interval) {
                clearInterval(interval);
            }
        }   
    })

    let rangeValue = $state(47);
    let offset = $state(new Date().getTimezoneOffset() / -60);

    for (let i = 0; i < 48; i++) {
        let now = new Date();
        now.setUTCMinutes(now.getUTCMinutes() - (now.getUTCMinutes() % 15));
        now.setUTCMinutes(now.getUTCMinutes() - ((48 - i) * 15));
        let year = now.getUTCFullYear();
        let month = String(now.getUTCMonth() + 1).padStart(2, '0');
        let day = String(now.getUTCDate()).padStart(2, '0');
        let hours = String(now.getUTCHours()).padStart(2, '0');
        let minutes = String(now.getUTCMinutes()).padStart(2, '0');
        urls.push(`https://imn-rust-lb.infoplaza.io/v4/nowcast/tiles/satellite-europe/${year}${month}${day}${hours}${minutes}/7/44/65/51/72?outputtype=jpeg`);
    }
    
    $effect(() => {

        let now = new Date();
        now.setUTCMinutes(now.getUTCMinutes() - (now.getUTCMinutes() % 15));
        now.setUTCMinutes(now.getUTCMinutes() - ((48 - rangeValue) * 15));
        let hours = String(now.getUTCHours()).padStart(2, '0');
        let minutes = String(now.getUTCMinutes()).padStart(2, '0');
        date = `${Number(hours)+offset}:${minutes}`
        
        if(weatherFuncs.getSatelliteImages() == undefined) {
            preloadImages(urls).then((loadedImages) => {
                images = loadedImages;
                allImagesLoaded = true;
                weatherFuncs.setSatelliteImages(loadedImages);
            }).catch((error) => {
                console.error('Failed to load images', error);
            });
        } else {
            images = weatherFuncs.getSatelliteImages();
            allImagesLoaded = true;
        }

    })

    let loaded = 0;
    let allImagesLoaded = $state(false);
    let images: any = $state([]);
    async function preloadImages(urls: any[]) {
        return Promise.all(
            urls.map((url: string) =>
            new Promise((resolve) => {
                const img = new Image();
                img.src = url;
                img.onload = () => {resolve(img); loaded += 1};
                img.onerror = () => {
                    resolve(null);
                };
            })
            )
        ).then((images) => images.filter((img) => img !== null)); // Filter out failed images
    }
</script>


<div class="margin-top2">
    <div class="satellite-imagery radius-heavy flexcolumn gap2 halign">
        {#if allImagesLoaded}
            <img class="image radius-heavy" src={images[rangeValue].src} alt="European satellite view">
        {/if}
        <div class="flexrow hexpand valign gap2">
            <p>{date}</p>
            <button class="transparent valign" onclick={() => {playing.set(!$playing)}}>
                {#if $playing}
                    <svg class="icon" viewBox="-1 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>pause [#1006]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-227.000000, -3765.000000)" fill="var(--font-primary-color)"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606" id="pause-[#1006]"> </path> </g> </g> </g> </g></svg>
                {:else}
                    <svg class="icon" viewBox="-0.5 0 7 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>play [#1003]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-347.000000, -3766.000000)" fill="var(--font-primary-color)"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M296.494737,3608.57322 L292.500752,3606.14219 C291.83208,3605.73542 291,3606.25002 291,3607.06891 L291,3611.93095 C291,3612.7509 291.83208,3613.26444 292.500752,3612.85767 L296.494737,3610.42771 C297.168421,3610.01774 297.168421,3608.98319 296.494737,3608.57322" id="play-[#1003]"> </path> </g> </g> </g> </g></svg>
                {/if}
            </button>
            <input type="range" class="hexpand" bind:value={rangeValue} min="0" max="47" onmousedown={() => {
                if($playing) {
                    playing.set(false);
                }
            }}>
        </div>
    </div>
</div>

<style>
    .satellite-imagery {
        width: 100%;
        max-width: 600px !important;
    }
    img {
        width: 100%;
        transition-duration: 500ms;
    }
</style>