<template>
  <div>
    <input type="text" name="city" id="city" v-model='city_value'>
    <button @click='xiShi'>提交</button>
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
			city_value: '',
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
		xiShi () {
			this.district_obj.search(this.city_value, (status, result) => {
				let bounds = result.districtList[0].boundaries
				for (let i = 0, l = bounds.length; i < l; i++) {
					// 过滤所有polygon中的经纬度少于500个的polygon，不渲染（比如一些非常小的polygon，小岛等），提高渲染速度
					console.log('获取城市：', bounds)
					if (bounds[i].length > 500) {
						// 生成行政区划polygon
						console.log('原始经纬度：', bounds[i])
						let new_lng_lat_arr = this.filterLngLat(bounds[i], 10)
						console.log('得到的filter经纬度：', this.city_value, new_lng_lat_arr)
						// let polygon = new AMap.Polygon({
						// 	strokeWeight: 0.5,
						// 	path: new_lng_lat_arr,
						// 	fillOpacity: 0.1,
						// 	fillColor: '#67A92A',
						// 	strokeColor: '#67A92A',
						// 	zIndex: 9
						// })
						// this.free_polygons.push(polygon)
					}
				}
				// 获取一口价区域
				// this.map_obj.add(this.free_polygons)
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
