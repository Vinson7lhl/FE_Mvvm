<template>
    <!--地图key：91d237871daaea4be71c6231979cc2bd-->
	<div class="map" id='map_page'>
        <div class='controllerPanel'>
            这里是map控制面板
        </div>
        <div class='mapContainer' id='map_container'></div>
    </div>
</template>
<script>
	export default {
		name: "map-page",
		data() {
			return {};
		},
		mounted() {
            let map = new AMap.Map('map_container');

        },
		methods: {},
	}
</script>

<style lang="scss">
    #map_page{
        .mapContainer{
            width:100%;
            height:100vh;
        }
    }
</style>
