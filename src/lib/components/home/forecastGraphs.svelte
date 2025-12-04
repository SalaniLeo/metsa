<script lang="ts">
	import type { forecastGraph } from '$lib/graphs.ts';
	import { Chart } from 'chart.js/auto';
	import { onMount, onDestroy } from 'svelte';
	import GraphDropdown from '../templates/graphDropdown.svelte';
	import { weatherFuncs } from '$lib/weatherData.svelte';

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

	const times = graph.startIndex != undefined && graph.endIndex != undefined ? Object.values(graph.dataset.time).slice(graph.startIndex, graph.endIndex) : Array.isArray(graph.dataset.time) ? graph.dataset.time : [graph.dataset.time];

	times.forEach((time: String) => {
		chartLabels.push(weatherFuncs.convertTimestamp(time, times))
	});

	let graphData = $state(graph.startingData);

	let graphDatasets: any[] = $derived(
		 graphData.map((data: any) => ({
			label: data,
			borderColor: randomColor(data),
			data: graph.startIndex != undefined && graph.endIndex != undefined ? Object.values((graph.dataset as any)?.[data]).slice(graph.startIndex, graph.endIndex) : (graph.dataset as any)?.[data],
			fill: false,
			pointRadius: 2,
			tension: 0
		}))
	)

	let ctx: CanvasRenderingContext2D | null = null;
	let chartCanvas: any = $state();
	let chart: any = $state();

	$effect(() => {
		if(chart != undefined) {
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
					y: {
						ticks: {
							autoSkipPadding: 0
						}
					},
					x: {
						ticks: {
							maxRotation: 0,
							minRotation: 0,
							autoSkip: true,
							autoSkipPadding: 25
						},
					},
				}
			},
		});
	});

	onDestroy(() => {
		if (chart) chart.destroy();
	});
	
	let screensize: any = $state()

</script>

<svelte:window bind:innerWidth={screensize}/>

<div class="flexcolumn gap2">
	<div class="flexrow valign gap2">
		<div class="flexrow-responsive valign gap2">
			<h4>Select graph data:</h4>
			<GraphDropdown elements={graph.dataset} title={"Select data"} bind:selected={graphData}></GraphDropdown>
		</div>
	</div>
	<canvas bind:this={chartCanvas} id="chart"></canvas>
</div>

<style>
	canvas {
		/* aspect-ratio: 16/9 !important; */
		max-width: 1600px !important;
		max-height: 800px !important;
	}
</style>