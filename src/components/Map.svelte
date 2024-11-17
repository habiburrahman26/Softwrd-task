<script lang="ts">
	import Feature from 'ol/Feature.js';
	import Map from 'ol/Map.js';
	import View from 'ol/View.js';
	import { Circle } from 'ol/geom.js';
	import { OSM, Vector as VectorSource } from 'ol/source.js';
	import { Style } from 'ol/style.js';
	import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
	import { fromLonLat } from 'ol/proj.js';
	import 'ol/ol.css';
	import type { LandingZone } from '../types/landingType';

	let { landingPads }: { landingPads: LandingZone[] } = $props();

	$effect(() => {
		const vectorSource = new VectorSource();

		landingPads?.forEach((site) => {
			const { latitude, longitude } = site.location;
			const status = site.status;

			const coordinates = fromLonLat([longitude, latitude]);

			const circleFeature = new Feature({
				geometry: new Circle(coordinates, 50)
			});

			let color;
			if (status === 'active') {
				color = 'rgba(145, 246, 82)';
			} else if (status === 'under construction') {
				color = 'rgb(51, 154, 240)';
			} else {
				color = 'rgb(255, 107, 107)';
			}

			circleFeature.setStyle(
				new Style({
					renderer(coordinates, state) {
						// @ts-ignore
						const [[x, y]] = coordinates;
						const ctx = state.context;
						const radius = 10;

						ctx.beginPath();
						ctx.arc(x, y, radius, 0, 2 * Math.PI);
						ctx.fillStyle = color;
						ctx.fill();
						ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
						ctx.stroke();
					}
				})
			);

			vectorSource.addFeature(circleFeature);
		});

		let map = new Map({
			layers: [
				new TileLayer({
					source: new OSM({
						attributions: []
					})
				}),
				new VectorLayer({
					source: vectorSource
				})
			],
			target: 'map',
			view: new View({
				center: fromLonLat([-80.544444, 28.485833]),
				zoom: 2
			}),
			controls: []
		});

		return () => {
			if (map) {
				map.dispose();
				vectorSource.clear();
			}
		};
	});
</script>

<div id="map" class="map" style="width: 100%; height: 280px;"></div>
