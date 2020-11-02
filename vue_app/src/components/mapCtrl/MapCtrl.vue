<template>
	<div class="mapCtrl">
		<button @click="addMarkers">增加Geo_json点</button>
		<input type="checkbox" v-model="is_removed" /> 是否可以拖拽marker
		<div
			class="editButton"
			:style="{ top: top_val, left: left_val }"
			v-show="is_show_edit_button"
			@click="changeLocation"
		>
			修改位置
		</div>
		<div
			class="finishEditButton"
			:style="{ top: end_top_val, left: end_left_val }"
			v-show="is_show_end_edit_button"
		>
			<div class="submitButton" @click="submitLocation">确认</div>
			<div class="goBackButton" @click="goBack">返回</div>
		</div>
	</div>
</template>
<script>
// import { mapState } from 'Vuex'
// 引入地图打点图片
// import mapStar from '@/assets/img/map_star.png'
import fake_markers_data from '@/configs/fake_data_marker.js'
// import fake_polyline_data from "@/config/fake_daa_polyline";
// import fake_polygon_data from "@/config/fake_data_polygon";

export default {
	data () {
		return {
			is_removed: false,
			marker_arr: [],
			is_show_edit_button: false,
			is_show_end_edit_button: false,
			top_val: '',
			left_val: '',
			end_top_val: '',
			end_left_val: '',
			marker_lnglat: '',
			position_picker: '',
			mass_marker: [],
			mass_marker_style: []
		}
	},
	computed: {
		// ...mapState(['G_map'])
	},
	props: ['mapObj'],
	watch: {
		mapObj (old_data, new_data) {
			console.log('地图初始化完毕，操作', this.mapObj)
		},
		is_removed (new_data) {
			console.log('is_removed', new_data)
			if (new_data) {
				// 可以编辑
				for (let i = 0; i < this.marker_arr.length; i++) {
					console.log('可以编辑')
					// 绑定hover事件
					this.marker_arr[i].on('mouseover', this.mouseoverCallback)
					this.marker_arr[i].on('mouseout', this.mouseoutCallback)
				}
				return
			}
			// 不可编辑
			for (let i = 0; i < this.marker_arr.length; i++) {
				console.log('不可编辑')
				// 绑定hover事件
				this.marker_arr[i].off('mouseover', this.mouseoverCallback)
				this.marker_arr[i].off('mouseout', this.mouseoutCallback)
			}
		}
	},
	mounted () {
		console.log('地图控制器初始化完毕')
	},
	methods: {
		addMarkers () {
			// 一定是拿到数据后再清除、定位、添加覆盖物
			// 设置地图层级和中心点
			// this.mapObj.setZoomAndCenter(7, [117.8613, 32.3985])
			// this.marker_arr = []
			// let markers_geo_obj = new AMap.GeoJSON({
			// 	geoJSON: fake_markers_data,
			// 	// 这里面就是一个遍历，能够默认遍历里面的所有点
			// 	getMarker: (geo_json, lng_lat) => {
			// 		let html_str = ''
			// 		let marker_obj = ''
			// 		if (geo_json.properties.name) {
			// 			html_str = `<div class="numContent">${geo_json.properties.name}：${geo_json.properties.age}</div><div class='areaName'>${geo_json.properties.name}</div>`
			// 			marker_obj = new AMap.Marker({
			// 				position: lng_lat,
			// 				content: html_str,
			// 				anchor: 'center',
			// 				zIndex: 3
			// 			})
			// 		} else {
			// 			marker_obj = new AMap.Marker({
			// 				position: lng_lat,
			// 				anchor: 'center',
			// 				zIndex: 3
			// 			})
			// 		}
			// 		// 绑定点击事件
			// 		// marker_obj.on('click',(info)=>{
			// 		// 	this.clickMarkerCallback(marker_obj, markers_geo_obj)
			// 		// })

			// 		// 此处必须返回当下的marker对象
			// 		this.marker_arr.push(marker_obj)
			// 		return marker_obj
			// 	},
			// 	getPolygon: (geo_json, lng_lat) => {
			// 		console.log(geo_json, lng_lat)
			// 		let polygon_obj = new AMap.Polygon({
			// 			path: lng_lat,
			// 			zIndex: 1,
			// 			strokeColor: '#2E82CF',
			// 			strokeOpacity: 1,
			// 			strokeWeight: 2,
			// 			fillColor: '#318FE9',
			// 			fillOpacity: 0.7
			// 		})
			// 		// 绑定点击事件
			// 		polygon_obj.on('click', () => {
			// 			// this.clickPolygonCallback(polygon_obj,{orgId:'123333'}, markers_geo_obj)
			// 		})
			// 		// 此处必须返回当下的marker对象
			// 		return polygon_obj
			// 	}
			// })
			// 这个info就是当下被触发的覆盖物对象marker/polygon/polyline
			// markers_geo_obj.on('mouseover',(info)=>{
			// 	console.log('geoJson的click：',info)
			// })
			let begin_time = new Date()
			console.log('开始时间：', begin_time)
			for (let i = 0; i < fake_markers_data.features.length; i++) {
				console.log('------')
				this.mass_marker.push(
					{
						lnglat: [fake_markers_data.features[i].geometry.coordinates[0], fake_markers_data.features[i].geometry.coordinates[1]],
						name: 'beijing',
    					id: i
					}
				)
			}
			let mass_marker_obj = new AMap.MassMarks(this.mass_marker, {
				zIndex: 5, // 海量点图层叠加的顺序
				zooms: [3, 19],
				style: {
					url: '//vdata.amap.com/icons/b18/1/2.png', // 图标地址
					size: new AMap.Size(11, 11), // 图标大小
					anchor: new AMap.Pixel(5, 5)
				} // 图标显示位置偏移量，基准点为图标左上角}
			})
			mass_marker_obj.setMap(this.mapObj)
			mass_marker_obj.on('complete', function() {
				console.log('mass点加载完成……')
				let end_time = new Date()
				console.log('结束时间1：', end_time)
				console.log("process time is111=", end_time - begin_time);
			})
			let end_time = new Date()
			console.log('结束时间：', end_time)
			console.log("process time is=", end_time - begin_time);
			// 将点添加到地图
			// markers_geo_obj.setMap(this.mapObj)
			this.mapObj.setFitView()
		},
		clickMarkerCallback (marker_obj, ohterInfo) {
			console.log('marker触发', marker_obj, '当下id：', ohterInfo.orgId)
			// 拿到id，再请求 addMarkers
			// 清空所有覆盖物
			// this.mapObj.clearMap()
		},
		clickPolygonCallback (polygon_obj) {
			console.log('polygon触发', polygon_obj.getPosition())
		},
		/**
		 * @description 鼠标经过时触发
		 * @params {object} marker_info 回调形参，其属性target属性为Marker对象
		 */
		mouseoverCallback (marker_info) {
			// 显示编辑按钮
			this.is_show_edit_button = true
			// 将此marker经纬度转换为x y坐标值，并增加偏移量
			this.marker_lnglat = marker_info.target.getPosition()
			let marker_pixel = this.mapObj.lngLatToContainer(
				this.marker_lnglat
			)
			this.left_val = marker_pixel.getX() + 'px'
			this.top_val = marker_pixel.getY() + 100 + 'px'
		},
		/**
		 * @description 鼠标离开时触发
		 */
		mouseoutCallback () {
			// 隐藏编辑按钮
			this.is_show_edit_button = false
		},
		/**
		 * @description 拖拽成功后触发
		 */
		finishedEdit (position_obj) {
			console.log('拖拽结束：', position_obj)
			let end_position = this.mapObj.lngLatToContainer(position_obj.position)
			this.end_top_val = end_position.getY() + 'px'
			this.end_left_val = end_position.getX() + 'px'
			this.is_show_end_edit_button = true
		},
		// 修改位置
		changeLocation () {
			if (this.position_picker) {
				this.position_picker.stop()
			}
			this.is_show_edit_button = false
			AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
				// 初始化拖拽对象
				this.position_picker = new PositionPicker({
					mode: 'dragMarker',
					map: this.mapObj
					// iconStyle: {
					// 	url: `${staticResourcesUrl}dotDistribution//编组%203%402x.png`,
					// 	size: [48, 48],
					// 	ancher: [6, 48]
					// }
				})
				// 选择起始位置
				console.log(this.marker_lnglat)
				this.mapObj.setCenter(this.marker_lnglat)
				this.position_picker.start(this.marker_lnglat)// 115.6201171875, 33.137551192346145
				// 拖拽完毕后回调
				this.position_picker.on('success', positionResult => {
					console.log('成功')
					// this.finishedEdit(positionResult)
				})
				// 失败后回调
				this.position_picker.on('fail', function (positionResult) {
					console.log('拖拽失败！！！')
				})
			})
		},
		submitLocation () {
		},
		goBack () {

		}
	}
}
</script>

<style lang="scss">
	.editButton {
		position: absolute;
		z-index: 1;
		width: 100px;
		line-height: 24px;
		font-size: 14px;
		text-align: center;
		background-color: #000000;
		color: #fff;
		cursor: pointer;
	}
	.finishEditButton {
		position: absolute;
		z-index: 1;
		width: 100px;
		line-height: 24px;
		font-size: 14px;
		text-align: center;
		background-color: #000000;
		color: #fff;
		cursor: pointer;
	}
</style>
