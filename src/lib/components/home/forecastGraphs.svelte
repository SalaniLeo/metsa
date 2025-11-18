<script lang="ts">
	import type { forecastGraph } from '$lib/graphs.ts';
	import { Chart } from 'chart.js/auto';
	import { onMount, onDestroy } from 'svelte';
	import Dropdown from '../templates/dropdown.svelte';

	interface Props {
		graph: forecastGraph;
	}

	let { graph }: Props = $props();

	let chartLabels: string[] = [];

	let last: any = undefined
	function randomColor(dataset: any) {
		if(last === undefined || last !== dataset) {
			return `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;
		}
		last = dataset
	}

	const times = graph.startIndex != undefined && graph.endIndex != undefined ? Object.values(graph.dataset.time).slice(graph.startIndex, graph.endIndex) : graph.dataset.time;
	times.forEach((time: String) => {
		Object.values(times).length <= 24 ? chartLabels.push(String(time).slice(16, 21)) : chartLabels.push(String(time).slice(4, 10) + ' - ' + String(time).slice(16, 21));
	});

	let graphData = $state(graph.startingData);

	let graphDatasets: any[] = $derived(
		 graphData.map((data: any) => ({
			label: data,
			borderColor: randomColor(data),
			data: graph.startIndex != undefined && graph.endIndex != undefined ? Object.values((graph.dataset as any)?.[data]).slice(graph.startIndex, graph.endIndex) : (graph.dataset as any)?.[data],
			fill: false,
			pointRadius: 0,
			tension: 0
		}))
	)

	let ctx: CanvasRenderingContext2D | null = null;
	let chartCanvas: any = $state();
	let chart: any = $state();

	$effect(() => {
		if(graphDatasets.length > 0 && chart != undefined) {
			chart.data.datasets = graphDatasets
			chart.update()
		}
	})

	onMount(() => {
		if (!chartCanvas) return;
		ctx = chartCanvas.getContext('2d');
		chart = new Chart(ctx as CanvasRenderingContext2D, {
			type: 'line',
			data: {
				labels: chartLabels,
				datasets: graphDatasets,
			},
			options: {
				responsive: true,
				scales: {
				x: {
					ticks: {
						maxRotation: 0,
						minRotation: 0,
						autoSkip: true,
					},
				},
				}
			},
		});
	});

	onDestroy(() => {
		if (chart) chart.destroy();
	});
</script>


<div class="flexcolumn gap2">
	<div class="flexrow valign gap2">
		<div class="flexrow-responsive gap2">
			<div class="flexrow valign gap2">
				<h3>Select graph data:</h3>
				<Dropdown title={"Select data"} elements={Object.keys(graph.dataset)} bind:selected={graphData}></Dropdown>
			</div>
			<div class="valign gap2 flexrow-responsive">
				{#each graphData as data, i}
					<div class="flexrow gap2 selected-data bg-secondary padding2 radius-medium border">
						{data}
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button onclick={() => {graphData = graphData.filter((item: any) => item !== data)}} class="transparent valign">
							<svg width=20 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="var(--font-secondary-color)" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="var(--font-primary-color)" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<canvas bind:this={chartCanvas} id="chart"></canvas>
	
</div>