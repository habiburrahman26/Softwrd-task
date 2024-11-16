<script lang="ts">
	import {
		Badge,
		Button,
		Dropdown,
		Modal,
		Progressbar,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { LandingZone } from '../types/landingType';
	import { LinkOutline } from 'flowbite-svelte-icons';

	let { tableData }: { tableData: LandingZone[] } = $props();
</script>

<Table>
	<TableHead class="text-gray-500">
		<TableHeadCell>Full Name</TableHeadCell>
		<TableHeadCell>Location Name</TableHeadCell>
		<TableHeadCell>Region</TableHeadCell>
		<TableHeadCell>Details</TableHeadCell>
		<TableHeadCell>Success Rate</TableHeadCell>
		<TableHeadCell>WikiPedia Link</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each tableData as item}
			<TableBodyRow>
				<TableBodyCell>{item.full_name}</TableBodyCell>
				<TableBodyCell>{item.location.name}</TableBodyCell>
				<TableBodyCell>{item.location.region}</TableBodyCell>
				<TableBodyCell>
					<button class="text-xs font-medium bg-gray-100 text-gray-900 px-2 py-1 rounded"
						>View Details</button
					>
				</TableBodyCell>
				<TableBodyCell>
					{#if isNaN(item.successful_landings / item.attempted_landings) === false}
						<Progressbar
							progress={Math.floor((item.successful_landings / item.attempted_landings) * 100)}
							progressClass="bg-green-400"
							size="h-1.5"
						/>
					{/if}

					<span class="text-xs text-gray-500"
						>{isNaN(item.successful_landings / item.attempted_landings)
							? 'N/A'
							: Math.floor((item.successful_landings / item.attempted_landings) * 100) + '%'}</span
					>
				</TableBodyCell>
				<TableBodyCell>
					<Button href={item.wikipedia} target="_blank" size="xs">
						<LinkOutline class="text-blue-500" />
					</Button>
				</TableBodyCell>
				<TableBodyCell>
					<Badge
						color={item.status === 'active' ? 'green' : item.status === 'retired' ? 'red' : 'blue'}
						>{item.status}</Badge
					>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
