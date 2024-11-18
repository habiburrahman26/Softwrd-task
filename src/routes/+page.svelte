<script lang="ts">
	import { onMount } from 'svelte';
	import type { LandingZone } from '../types/landingType';
	import TableView from '../components/TableView.svelte';
	import GridView from '../components/GridView.svelte';
	import { Button, ButtonGroup, Dropdown, Radio, Spinner } from 'flowbite-svelte';
	import {
		AdjustmentsVerticalOutline,
		AngleDownOutline,
		GridSolid,
		ListOutline
	} from 'flowbite-svelte-icons';
	import DoughnutChart from '../components/DoughnutChart.svelte';
	import Map from '../components/Map.svelte';

	let dataView = $state<'table' | 'grid'>('table');
	let data: LandingZone[] = $state([]);
	let filter = $state('');
	let loading = $state(true);
	let error = $state('');

	onMount(async () => {
		try {
			const response = await fetch('https://api.spacexdata.com/v3/landpads');
			data = await response.json();
		} catch (err) {
			error = 'Failed to fetch data. Please try again later.';
		} finally {
			loading = false;
		}
	});

	let filteredData: LandingZone[] = $derived.by(() => {
		return filter !== '' ? data.filter((d) => d.status === filter) : data;
	});

	function handleView(view: 'table' | 'grid') {
		dataView = view;
	}
</script>

{#if loading}
	<div class="h-screen flex justify-center items-center">
		<Spinner color="gray" />
	</div>
{/if}

{#if !loading && filteredData.length > 0}
	<div class="grid grid-cols-12 gap-6 py-8 px-4">
		<div class="col-span-12 xl:col-span-8">
			<div class="flex items-center justify-between pb-4">
				<ButtonGroup>
					<Button color="alternative" size="xs" on:click={() => handleView('table')}
						><ListOutline
							class={`w-5 h-5 ${dataView === 'table' ? 'text-blue-500' : ''}`}
						/></Button
					>
					<Button color="alternative" size="xs" on:click={() => handleView('grid')}
						><GridSolid class={`w-5 h-5 ${dataView === 'grid' ? 'text-blue-500' : ''}`} /></Button
					>
				</ButtonGroup>

				<div>
					<button
						color="light"
						class="flex items-center gap-1 rounded-lg border-2 border-[#E5E7EB] bg-[#F8F8F8] px-2 py-1.5"
						><AdjustmentsVerticalOutline class="ms-2 size-5 text-gray-800" />
						<span class="text-sm font-medium text-gray-800">Filter By Status</span>
						<AngleDownOutline class="ms-2 size-4 font-medium text-gray-800" /></button
					>
					<Dropdown class="w-48 space-y-1 p-3">
						<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<Radio name="group2" bind:group={filter} value="active">Active</Radio>
						</li>
						<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<Radio name="group2" bind:group={filter} value="retired">Retaired</Radio>
						</li>
						<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<Radio name="group2" bind:group={filter} value="under construction"
								>Under construction</Radio
							>
						</li>
					</Dropdown>
				</div>
			</div>
			{#if dataView === 'table'}
				<TableView tableData={filteredData} />
			{:else}
				<GridView data={filteredData} />
			{/if}
		</div>
		<div class="col-span-12 xl:col-span-4 flex flex-col md:flex-row xl:flex-col gap-5">
			<div class="rounded-lg shadow  overflow-hidden basis-1/2">
				<h2 class="p-2 font-semibold text-[#111928]">Map View</h2>
				<Map landingPads={filteredData} />
			</div>
			<div class="rounded-lg shadow basis-1/2">
				<h2 class="border-b-2 p-2 font-semibold text-[#111928]">Success Rate Chart</h2>
				<DoughnutChart chartData={filteredData} />
			</div>
		</div>
	</div>
{/if}

{#if !loading && error !== ''}
	<p class="pt-20 text-lg text-gray-700 text-center">{error}</p>
{/if}
