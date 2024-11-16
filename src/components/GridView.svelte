<script lang="ts">
	import { Badge, Button, Progressbar } from 'flowbite-svelte';
	import { LinkOutline } from 'flowbite-svelte-icons';
	import type { LandingZone } from '../types/landingType';

	let { data }: { data: LandingZone[] } = $props();
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
	{#each data as item}
		<div class="bg-white shadow-md rounded-lg p-4">
			<div class="text-sm text-gray-500">
				<span class="font-medium">Name: </span>
				{item.full_name}
			</div>
			<div class="text-sm text-gray-500">
				<span class="font-medium">Location: </span>
				{item.location.name}
			</div>
			<div class="text-sm text-gray-500">
				<span class="font-medium">Region: </span>
				{item.location.region}
			</div>

			<div class="mt-2">
				<div class="text-sm font-medium text-gray-500">Success Rate</div>
				{#if isNaN(item.successful_landings / item.attempted_landings) === false}
					<div class="flex items-center gap-2">
						<Progressbar
							progress={Math.floor((item.successful_landings / item.attempted_landings) * 100)}
							progressClass="bg-green-400"
							size="h-1.5"
						/>
						<span class="text-xs text-gray-500 font-medium"
							>{isNaN(item.successful_landings / item.attempted_landings)
								? 'N/A'
								: Math.floor((item.successful_landings / item.attempted_landings) * 100) +
									'%'}</span
						>
					</div>
				{/if}
			</div>

			<div class="flex items-center">
				<span class="text-sm text-gray-500 font-medium">Wikipedia Link</span> : <Button
					href={item.wikipedia}
					target="_blank"
					size="xs"
				>
					<LinkOutline class="text-blue-500" />
				</Button>
			</div>

			<div class="mt-2 text-sm text-gray-500">
				<span class="font-medium">Status: </span>
				<Badge
					color={item.status === 'active' ? 'green' : item.status === 'retired' ? 'red' : 'blue'}
				>
					{item.status}
				</Badge>
			</div>
		</div>
	{/each}
</div>
