<script lang="ts">
	import { onMount } from 'svelte';
	import type { LandingZone } from '../types/landingType';
	import TableView from '../components/TableView.svelte';
	import GridView from '../components/GridView.svelte';
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import { GridSolid, ListOutline } from 'flowbite-svelte-icons';

	let dataView = $state<'table' | 'grid'>('table');
	let data: LandingZone[] = $state([]);
	let filter = $state('');

	onMount(() => {
		fetch('https://api.spacexdata.com/v3/landpads')
			.then((res) => res.json())
			.then((result) => {
				data = result;
			});
	});

	let filteredData: LandingZone[] = $derived.by(() => {
		return filter !== '' ? data.filter((d) => d.status === filter) : data;
	});

	function handleView(view: 'table' | 'grid') {
		dataView = view;
	}
</script>

<div class="grid grid-cols-12 gap-6 py-8 px-4">
	<div class="col-span-8">
		<div class="pb-4">
			<ButtonGroup>
				<Button color="alternative" size="xs" on:click={() => handleView('table')}
					><ListOutline class={`w-5 h-5 ${dataView === 'table' ? 'text-blue-500' : ''}`} /></Button
				>
				<Button color="alternative" size="xs" on:click={() => handleView('grid')}
					><GridSolid class={`w-5 h-5 ${dataView === 'grid' ? 'text-blue-500' : ''}`} /></Button
				>
			</ButtonGroup>
		</div>
		{#if dataView === 'table'}
			<TableView tableData={filteredData} />
		{:else}
			<GridView data={filteredData} />
		{/if}
	</div>
</div>
