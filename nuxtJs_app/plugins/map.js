/**
 * @description 地图插件，默认绑定在全局$initMap上，需要传入一个id容器，一个回调函数——用来接收GMap对象
 */
import Vue from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

Vue.prototype.$initMap = (container, callback) => {
	AMapLoader.load({
		// 申请好的Web端开发者Key，首次调用 load 时必填
		key: '91d237871daaea4be71c6231979cc2bd',
		// 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		version: '2.0',
		// 需要使用的的插件列表，如比例尺'AMap.Scale'等
		plugins: ['AMap.DistrictSearch', 'AMap.InfoWindow'],
		// 是否加载 AMapUI，缺省不加载
		AMapUI: {
			version: '1.1',
			// 需要加载的 AMapUI ui插件
			plugins: ['misc/PathSimplifier']
		},
		// 是否加载 Loca， 缺省不加载
		Loca: {
			version: '2.0'
		}
	}).then(AMap => {
		const MAP_OBJ = new AMap.Map(container)
		// 设定MAP风格
		MAP_OBJ.setMapStyle('amap://styles/whitesmoke')
		const PATH_OBJ = window.AMapUI.PathSimplifier
		callback(MAP_OBJ, PATH_OBJ, AMap)
	}).catch(e => {
		console.log(e)
	})
}