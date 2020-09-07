<template>
	<!--地图key：91d237871daaea4be71c6231979cc2bd-->
	<div class="map" id="map_page">
		<div class="controllerPanel">
			这里是map控制面板
			<span class="iconfont icon-guanbi"></span>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-guanbi" />
			</svg>
		</div>
		<div class="mapContainer" id="map_container"></div>
	</div>
</template>
<script>
	export default {
		name: "map-page",
		data() {
			return {};
		},
		mounted() {
			let map = new AMap.Map("map_container");
		},
		methods: {
			// 打点
			mapDrawPoint(map_obj, lng_lat_arr) {
				console.log('打点')
			},
			// 画线
			mapDrawLine(map_obj, lng_lat_arr) {
				console.log('画线')
			},
			// 画区域
			mapDrawArea(map_obj, lng_lat_arr) {
				console.log('画区域')
			}
		},
	};
</script>

<style lang="scss">
	#map_page {
		.mapContainer {
			width: 100%;
			height: 100vh;
		}
	}
</style>
