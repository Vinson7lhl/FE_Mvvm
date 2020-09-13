<template>
	<!--地图key：91d237871daaea4be71c6231979cc2bd-->
	<div class="map" id="map_page">
		<div class="controllerPanel">
			这里是map控制面板
			<span class="iconfont icon-guanbi"></span>
			<svg class="icon">
				<use xlink:href="#icon-guanbi" />
			</svg>
		</div>
		<div class="mapContainer" id="map_container"></div>
	</div>
</template>
<script>
import mapData from '@/configs/map_test_data.json'
import mapCtrl from '@/utils/map_ctrl.js'

export default {
	name: 'map-page',
	data () {
		return {}
	},
	mounted () {
		let map = new AMap.Map('map_container', {
			zoom: 11, // 级别
			center: [116.397428, 39.90923], // 中心点坐标
			viewMode: '3D' // 使用3D视图
		})

		// 覆盖物1
		let polyline1 = new AMap.Polyline({
			path: [
				new AMap.LngLat('116.368904', '39.913423'),
				new AMap.LngLat('116.382122', '39.901176')
			]
		})

		// 覆盖物2
		let polyline2 = new AMap.Polyline({
			path: [
				new AMap.LngLat('116.387271', '39.912501'),
				new AMap.LngLat('116.398258', '39.904600')
			]
		})

		// 创建覆盖物群组，传入覆盖物组成的数组
		let overlayGroup = new AMap.OverlayGroup([polyline1, polyline2])

		// 对此覆盖物群组设置同一属性
		overlayGroup.setOptions({
			strokeColor: 'red',
			strokeWeight: 5
		})

		// 统一添加到地图实例上
		map.add(overlayGroup)
		let geo_map_polygens = new AMap.GeoJSON({
			geoJSON: mapData,
			getPolyline: (geojson, lnglat) => {
				// 实例化一个路径覆盖物对象
				let polyLine = new AMap.Polyline({
					// 经纬度数组
					path: lnglat,
					// 边界透明度
					strokeOpacity: 0.8,
					// 边界颜色
					strokeColor: '#000000',
					// 边界宽度
					strokeWeight: 5,
					// 边界样式：虚线,实线,dashed || solid
					strokeStyle: 'solid',
					// 区域透明度，范围(0,1)
					fillOpacity: 0.7,
					// 区域填充颜色
					fillColor: '#000000',
					// 层级
					zIndex: 1,
					// 是否将操作冒泡到地图上
					bubble: true,
					// 鼠标悬停样式
					cursor: 'pointer',
					lineCap: 'round'
				})
				// 如果有回调函数，注入当下的区域覆盖物对象
				// if (options.callBack) {
				// 	options.callBack(polygon, info);
				// }
				// 此处必须返回这个实例，否则不会绘制
				return polyLine
			},
			getPolygon: (geojson, lnglat) => {
				// 实例化一个区域覆盖物对象
				let polygon = new AMap.Polygon({
					// 经纬度数组
					path: lnglat,
					// 边界透明度
					strokeOpacity: 0.8,
					// 边界颜色
					strokeColor: '#000000',
					// 边界宽度
					strokeWeight: 1,
					// 边界样式：虚线,实线,dashed || solid
					strokeStyle: 'solid',
					// 区域透明度，范围(0,1)
					fillOpacity: 0.2,
					// 区域填充颜色
					fillColor: '#000000',
					// 层级
					zIndex: 1,
					// 是否将操作冒泡到地图上
					bubble: true,
					// 鼠标悬停样式
					cursor: 'pointer'
				})
				// 如果有回调函数，注入当下的区域覆盖物对象
				// if (options.callBack) {
				// 	options.callBack(polygon, info);
				// }
				// 此处必须返回这个实例，否则不会绘制
				return polygon
			}
		})
		geo_map_polygens.setMap(map)
		geo_map_polygens.on('click', function () {
			console.log('被点击：', geo_map_polygens.getOverlays())
			console.log('被点击：', overlayGroup.getOverlays())
			map.setFitView(geo_map_polygens.getOverlays().fx)
		})
	},
	methods: {
		// 打点
		mapDrawPoint (map_obj, lng_lat_arr) {
			console.log('打点')
		},
		// 画线
		mapDrawLine (map_obj, lng_lat_arr) {
			console.log('画线')
		},
		// 画区域
		mapDrawArea (map_obj, lng_lat_arr) {
			console.log('画区域')
		}
	}
}
</script>

<style lang="scss">
	#map_page {
		.mapContainer {
			width: 100%;
			height: 100vh;
		}
	}
</style>
