<script lang="ts">
	import { onMount } from 'svelte';
	import type { LandingZone } from '../types/landingType';
	import TableView from '../components/TableView.svelte';

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
</script>

<div class="grid grid-cols-12 gap-6 p-8 px-4">
	<div class="col-span-8">
		<TableView tableData={filteredData} />
	</div>
</div>
