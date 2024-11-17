<script lang="ts">
	import type { LandingZone } from '../types/landingType';
	import type { ApexOptions } from 'apexcharts';

	let { chartData }: { chartData: LandingZone[] | [] } = $props();
	import { Chart } from 'flowbite-svelte';

	let options: ApexOptions = $derived.by(() => {
		let successRate = chartData.map((d) =>
			d.attempted_landings ? Math.floor((d.successful_landings / d.attempted_landings) * 100) : 0
		);
		let fullNames = chartData.map((d) => d.full_name);

		return {
			series: successRate,
			colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694'],
			chart: {
				height: 220,
				width: '100%',
				type: 'donut'
			},
			stroke: {
				colors: ['transparent']
			},
			plotOptions: {
				pie: {
					donut: {
						labels: {
							show: true,
							name: { show: true, offsetY: 20 },
							total: {
								showAlways: true,
								show: true,
								label: 'Landing Pads',
								formatter: () => successRate.length.toString()
							},
							value: { offsetY: -20 }
						},
						size: '80%'
					}
				}
			},
			labels: fullNames,
			dataLabels: {
				enabled: false
			},
			legend: {
				show: false
			}
		};
	});
</script>

<Chart {options} />
