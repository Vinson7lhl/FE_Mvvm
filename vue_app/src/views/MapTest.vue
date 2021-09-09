<template>
  <div>
    <label for='city_name'>城市名</label><input type="text" name="city_name" id="city_name" v-model='city_name_value'>
    <label for='city_code'>行政区划码</label><input type="text" name="city_code" id="city_code" v-model='city_code_value'>
    <label for='city_code'>经纬阈值</label><input placeholder='经纬度个数低于此值不会绘制' type="number" name="threshold" id="threshold" v-model='threshold_value'>
    <label for='city_code'>稀释度</label><input placeholder='N分之一' type="number" name="dilutability" id="dilutability" v-model='dilutability_value'>
    <button @click='drawFilterPolygon'>绘制</button>
    <MapCtrl :map-obj='map_obj'/>
    <Map @sendMapObj = 'getMapObj' />
  </div>
</template>
<script>
import Map from '@/components/map/Map.vue'
import MapCtrl from '@/components/mapCtrl/MapCtrl.vue'

export default {
	name: 'map-page',
	data () {
		return {
			map_obj: '',
			marker_obj: '',
			// 城市中文名
			city_name_value: '',
			// 城市code
			city_code_value: '',
			// 阈值（polygon经纬点数低于此阈值则不会绘制）
			threshold_value: '',
			// 经纬度稀释度
			dilutability_value: '',
			district_obj: '',
			free_polygons: []
		}
	},
	mounted () {
		console.log('父级初始化完毕')
	},
	components: {
		Map,
		MapCtrl
	},
	methods: {
		getMapObj (map_obj) {
			console.log('拿到map1')
			this.map_obj = map_obj
			this.district_obj = new AMap.DistrictSearch({
				// 获取边界不需要返回下级行政区
				subdistrict: 0,
				// 返回行政区边界坐标组等具体信息
				extensions: 'all',
				// 查询行政级别为 市
				level: 'district'
			})
		},
		drawFilterPolygon () {
			this.district_obj.search(this.city_code_value, (status, result) => {
				console.log('结果：', status, result)
				this.free_polygons = []
				let bounds = result.districtList[0].boundaries
				for (let i = 0, l = bounds.length; i < l; i++) {
					// 过滤所有polygon中的经纬度少于500个的polygon，不渲染（比如一些非常小的polygon，小岛等），提高渲染速度
					console.log('获取城市：', bounds)
					if (bounds[i].length > this.threshold_value) {
						// 生成行政区划polygon
						console.log('原始经纬度：', bounds[i])
						let new_lng_lat_arr = this.filterLngLat(bounds[i], this.dilutability_value)
						console.log('稀释后经纬度：', new_lng_lat_arr)
						let polygon = new AMap.Polygon({
							strokeWeight: 0.5,
							path: new_lng_lat_arr,
							fillOpacity: 0.1,
							fillColor: '#67A92A',
							strokeColor: '#67A92A',
							zIndex: 9
						})
						this.free_polygons.push(polygon)
					}
				}
				// 获取一口价区域
				this.map_obj.clearMap()
				this.map_obj.add(this.free_polygons)
				this.map_obj.setFitView(this.free_polygons)
			})
		},
		filterLngLat (lng_lag_arr, filter_level) {
			let new_lng_lat_arr = []
			for (let i = 0, length = lng_lag_arr.length; i < length; i++) {
				// 第一个 || 最后一个保存
				if (i === 0 || i === length - 1) {
					new_lng_lat_arr.push([lng_lag_arr[i].getLng(), lng_lag_arr[i].getLat()])
				}
				// 除去第一个和最后一个，且是偶数的，排除
				if (i >= 1 && i % filter_level === 0 && i !== length - 1) {
					let lng = lng_lag_arr[i].getLng()
					let lat = lng_lag_arr[i].getLat()
					new_lng_lat_arr.push([lng, lat])
				}
			}
			return new_lng_lat_arr
		}
	}
}
</script>

<style lang="scss">
</style>
