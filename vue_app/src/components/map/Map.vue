<template>
	<!--地图key：91d237871daaea4be71c6231979cc2bd-->
	<div class="map" id="map_page">
		<div class="mapContainer" id="map_container"></div>
	</div>
</template>
<script>
import { mapState } from 'Vuex'
// import mapData from '@/configs/map_test_data.json'
// 引入地图打点图片
// import mapStar from '@/assets/img/map_star.png'
export default {
	name: 'map-page',
	data () {
		return {
			map: '',
			marker_obj: ''
		}
	},
	computed: {
		...mapState(['G_map'])
	},
	mounted () {
		this.map = new AMap.Map('map_container', {
			zoom: 5, // 级别
			center: [116.397428, 39.90923], // 中心点坐标
			viewMode: '3D' // 使用3D视图
		})
		// this.$store.commit({
		// 	type: 'setGmap',
		// 	G_map: this.map
		// })
		this.$emit('sendMapObj', this.map)
		if (!this.G_map) {

			// 覆盖物1
			// let polyline1 = new AMap.Polyline({
			// 	path: [
			// 		new AMap.LngLat('116.368904', '39.913423'),
			// 		new AMap.LngLat('116.382122', '39.901176')
			// 	]
			// })

			// 覆盖物2
			// let polyline2 = new AMap.Polyline({
			// 	path: [
			// 		new AMap.LngLat('116.387271', '39.912501'),
			// 		new AMap.LngLat('116.398258', '39.904600')
			// 	]
			// })

			// 创建覆盖物群组，传入覆盖物组成的数组
			// let overlayGroup = new AMap.OverlayGroup([polyline1, polyline2])

			// 对此覆盖物群组设置同一属性
			// overlayGroup.setOptions({
			// 	strokeColor: 'red',
			// 	strokeWeight: 5
			// })

			// 统一添加到地图实例上
			// this.map.add(overlayGroup)
			// let geo_map_polygens = new AMap.GeoJSON({
			// 	geoJSON: mapData,
			// 	getPolyline: (geojson, lnglat) => {
			// 	// 实例化一个路径覆盖物对象
			// 		let polyLine = new AMap.Polyline({
			// 		// 经纬度数组
			// 			path: lnglat,
			// 			// 边界透明度
			// 			strokeOpacity: 0.8,
			// 			// 边界颜色
			// 			strokeColor: '#000000',
			// 			// 边界宽度
			// 			strokeWeight: 5,
			// 			// 边界样式：虚线,实线,dashed || solid
			// 			strokeStyle: 'solid',
			// 			// 区域透明度，范围(0,1)
			// 			fillOpacity: 0.7,
			// 			// 区域填充颜色
			// 			fillColor: '#000000',
			// 			// 层级
			// 			zIndex: 1,
			// 			// 是否将操作冒泡到地图上
			// 			bubble: true,
			// 			// 鼠标悬停样式
			// 			cursor: 'pointer',
			// 			lineCap: 'round'
			// 		})
			// 		// 如果有回调函数，注入当下的区域覆盖物对象
			// 		// if (options.callBack) {
			// 		// 	options.callBack(polygon, info);
			// 		// }
			// 		// 此处必须返回这个实例，否则不会绘制
			// 		return polyLine
			// 	},
			// 	getPolygon: (geojson, lnglat) => {
			// 	// 实例化一个区域覆盖物对象
			// 		let polygon = new AMap.Polygon({
			// 		// 经纬度数组
			// 			path: lnglat,
			// 			// 边界透明度
			// 			strokeOpacity: 0.8,
			// 			// 边界颜色
			// 			strokeColor: '#000000',
			// 			// 边界宽度
			// 			strokeWeight: 1,
			// 			// 边界样式：虚线,实线,dashed || solid
			// 			strokeStyle: 'solid',
			// 			// 区域透明度，范围(0,1)
			// 			fillOpacity: 0.2,
			// 			// 区域填充颜色
			// 			fillColor: '#000000',
			// 			// 层级
			// 			zIndex: 1,
			// 			// 是否将操作冒泡到地图上
			// 			bubble: true,
			// 			// 鼠标悬停样式
			// 			cursor: 'pointer'
			// 		})
			// 		// 如果有回调函数，注入当下的区域覆盖物对象
			// 		// if (options.callBack) {
			// 		// 	options.callBack(polygon, info);
			// 		// }
			// 		// 此处必须返回这个实例，否则不会绘制
			// 		return polygon
			// 	}
			// })
			// geo_map_polygens.setMap(this.map)
			// geo_map_polygens.on('click', () => {
			// 	console.log('被点击：', geo_map_polygens.getOverlays())
			// 	console.log('被点击：', overlayGroup.getOverlays())
			// 	this.map.setFitView(geo_map_polygens.getOverlays().fx)
			// })
		}
	},
	methods: {
		// 打点
		// addMarker () {
		// 	let icon_obj = new AMap.Icon({
		// 		// 图标尺寸
		// 		size: new AMap.Size(25, 25),
		// 		// 地址
		// 		image: mapStar,
		// 		// 根据所设置的大小拉伸或压缩图片
		// 		imageSize: new AMap.Size(25, 25)
		// 	})
		// 	this.marker_obj = new AMap.Marker({
		// 		// 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
		// 		position: [116.405467, 39.907761],
		// 		zIndex: 3,
		// 		offset: new AMap.Pixel(0, 0),
		// 		icon: icon_obj,
		// 		anchor: 'center'
		// 	})
		// 	this.map.add(this.marker_obj)
		// },
		// 画线
		// mapDrawLine (map_obj, lng_lat_arr) {
		// 	console.log('画线')
		// },
		// 画区域
		// mapDrawArea (map_obj, lng_lat_arr) {
		// 	console.log('画区域')
		// }
	}
}
</script>

<style lang="scss">
	#map_page {
		.mapContainer {
			width: 100%;
			height: 100vh;
			.numContent {
				box-sizing: border-box;
				font-size: 12px;
				color: #ffffff;
				padding: 2px 4px;
				background: #7909c1;
				border-radius: 4px;
				box-shadow: 1px 1px 10px rgba(0,0,0,0.7);
				white-space: nowrap;
				text-align: center;
				margin-bottom:2px;
			}
			.areaName {
				box-sizing: border-box;
				font-size: 14px;
				color: #000000;
				white-space: nowrap;
				text-align: center;
			}
		}
	}
</style>
