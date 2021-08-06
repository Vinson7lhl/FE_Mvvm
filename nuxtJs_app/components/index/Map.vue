<!--登录页以及注册页面组件-->
<template>
	<!--地图面板-->
	<div id='map_container' class='mapContainer'>
		<div class='legendArea' :class='{mapLegendClose: is_hide_map_legend}'>
			<div class='controlBar' @click='switchShowLegend'>
				<svg class='icon controlBarIcon' aria-hidden='true'>
					<use xlink:href='#icon-a-Group29' />
				</svg>
			</div>
			<div class='mapLegend'>
				<div class='perLegend'>
					<div class='legendIcon InArea' /> 一口价用箱区域
				</div>
				<div class='perLegend'>
					<div class='legendIcon' />超出一口价区域
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data () {
		return {
			// 地图实例
			map_obj: '',
			// 一口价区域数据以及核心仓库
			area: [{
				center: [
					126.65039062499999,
					45.767522962149876
				],
				info: '这里是info',
				name: '黑龙江'
			},
			{
				center: [
					125.2880859375,
					43.929549935614595
				],
				info: '这里是info2',
				name: '吉林'
			},
			{
				center: [
					123.37646484374999,
					41.82045509614034
				],
				info: '这里是info3',
				name: '辽宁'
			}],
			// 地图一口价基本配置
			district_config: {
				// 获取边界不需要返回下级行政区
				subdistrict: 0,
				// 返回行政区边界坐标组等具体信息
				extensions: 'all',
				// 查询行政级别为 市
				level: 'district'
			},
			// 一口价区域
			free_polygons: [],
			// 核心舱位置
			core_warehouses: [],
			// 是否显示地图图例
			is_hide_map_legend: false,
			// Infowindow窗口
			info_window_obj: ''
		}
	},
	computed: {},
	watch: {
	},
	mounted () {
		// 初始化地图模块
		this.$initMap('map_container', (map_obj, PathSimplifier, AMap) => {
			// 获取地图实例
			this.map_obj = map_obj
			// 将AMap和实例注入Vuex供其它组件使用
			console.log('初始化地图', AMap, map_obj)
			/* ------------------------- 绘制一口价区域和核心仓 ------------------------- */
			// 获取DistrictSearch插件实例
			let district_obj = new AMap.DistrictSearch(this.district_config)
			// 初始化infowindow弹窗
			this.info_window_obj = new AMap.InfoWindow({ offset: new AMap.Pixel(19, 0) })
			for (let i = 0; i < this.area.length; i++) {
				let core_marker = new AMap.Marker({
					position: this.area[i].center,
					content: '<img class="coreMarker markerAnimation" src="https://oss.cortp.com/ixiang/map/address_warehouse.png">',
					extData: this.area[i].info
				})
				// 鼠标hover弹出infowindow
				core_marker.on('mouseover', this.getCoreWarehouseInfo)
				core_marker.on('mouseout', this.hideCoreWarehouseInfo)
				// 添加核心仓marker
				map_obj.add(core_marker)
				// 添加一口价ploygon
				district_obj.search(this.area[i].name, (status, result) => {
					let bounds = result.districtList[0].boundaries
					for (let i = 0, l = bounds.length; i < l; i++) {
					// 生成行政区划polygon
						let polygon = new AMap.Polygon({
							strokeWeight: 0.5,
							path: bounds[i],
							fillOpacity: 0.1,
							fillColor: '#67A92A',
							strokeColor: '#67A92A'
						})
						this.free_polygons.push(polygon)
					}
					// 获取一口价区域
					map_obj.add(this.free_polygons)
				})
			}

			/* ------------------------- 轨迹绘制------------------------- */
			let pathSimplifierIns = new PathSimplifier({
				zIndex: 100,
				// autoSetFitView:false,
				map: map_obj, // 所属的地图实例

				getPath (pathData) {
					return pathData.path
				},
				getHoverTitle (pathData, pointIndex) {
					if (pointIndex >= 0) {
						// point
						return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length
					}

					return pathData.name + '，点数量' + pathData.path.length
				},
				renderOptions: {

					renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
				}
			})
			// 设置数据
			pathSimplifierIns.setData([{
				name: '路线0',
				path: [
					[116.405289, 39.904987],
					[87.61792, 43.793308]
				]
			}])

			// 对第一条线路（即索引 0）创建一个巡航器
			let navg1 = pathSimplifierIns.createPathNavigator(0, {
				loop: true, // 循环播放
				speed: 1000000 // 巡航速度，单位千米/小时
			})
			navg1.start()

			/* ------------------------- 轨迹本人所在地marker------------------------- */
			// 获取本人所在地经纬度
			let own_lnglat = []
			if (this.$route.path === '/') {
				window.navigator.geolocation.getCurrentPosition(position => {
					own_lnglat.push(position.coords.longitude, position.coords.latitude)
					console.log('经度纬度：', own_lnglat)
					let own_marker = new AMap.Marker({
						position: own_lnglat,
						content: '<img class="owneMarker markerAnimation" src="https://oss.cortp.com/ixiang/map/address_mine.png">'
					})
					map_obj.add(own_marker)
				})
				setTimeout(() => {
					// 自适应地图内标记
					map_obj.setFitView()
				}, 2000)
			}
			setTimeout(() => {
				// 自适应地图内标记
				map_obj.setFitView()
			}, 5000)
			this.$emit('getAMap', AMap)
			this.$emit('getMapObj', map_obj)
		})
	},
	methods: {
		/**
		 * @description 切换是否显示图例
		 */
		switchShowLegend () {
			this.is_hide_map_legend = !this.is_hide_map_legend
		},
		/**
		 * @description hover显示文本
		 */
		getCoreWarehouseInfo (context) {
			console.log('获取hover', context.target.getPosition())
			this.info_window_obj.setAnchor('bottom-center')
			this.info_window_obj.setContent('<div class="infoWindowPop">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>')
			console.log('得到的经纬度：', context.lnglat)
			this.info_window_obj.setPosition(context.target.getPosition())
			this.info_window_obj.open(this.map_obj)
		},
		/**
		 * @description 隐藏文本
		 */
		hideCoreWarehouseInfo () {
			this.info_window_obj.close()
		}
	}
}
</script>
<style lang="scss" scoped>
	.mapContainer{
		overflow: hidden;
		position: relative;
		flex:1;
		height:800px;
	}
	.legendArea{
		display: flex;
		align-items: center;
		position: absolute;
		z-index: 1;
		right:0;
		bottom:24px;
		transition:all 0.3s;
	}
	.mapLegend{
		width:154px;
		height:70px;
		color:#262F31;
		background: #DEE4E5;
		box-shadow: 12px 6px 13px 0px rgba(0, 0, 0, 0.14);
		border-radius: 4px;
	}
	.controlBar{
		cursor:pointer;
		width: 20px;
		height: 34px;
		background: #DEE4E5;
		border-radius: 4px 0px 0px 4px;
	}
	.controlBarIcon{
		fill:#666666;
		width: 18px;
		height: 34px;
		transition:all 0.3s;
	}
	.perLegend{
		width:157px;
		height:36px;
		padding-left:18px;
		display: flex;
		align-items: center;
	}
	.legendIcon{
		width: 16px;
		height: 16px;
		background: #F2F2F2;
		border-radius: 4px;
		border: 1px solid #758C8C;
		margin-right:8px;
	}
	.InArea{
		background: rgba(103, 169, 42, 0.18);
		border-radius: 4px;
		border: 1px solid #67A92A;
	}
	.mapLegendClose{
		right:-154px;
		.controlBarIcon{
			transform: rotate(180deg);
		}
	}
</style>
<style lang="scss">
	.coreMarker{
		width:38px;
		height:38px;
	}
	.owneMarker{
		width:64px;
		height:52px;
	}
	.infoWindowPop{
		padding:8px;
		color:#ffffff;
		font-size:14px;
		background-color: #2a455b;
	}
	.amap-info-content{
		background-color: #2a455b;
		border-radius: 4px;
		box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.4);
	}
	.bottom-center .amap-info-sharp{
		border-top: 8px solid #2a455b;
	}
	.amap-info-close{
		display: none;
	}
	.markerAnimation
	{
		animation: markerMove 1s infinite alternate;
	}

	@keyframes markerMove
	{
		from {
			transform:translateY(0px);
		}
		to {
			transform:translateY(10px);
		}
	}

	@-moz-keyframes markerMove
	{
		from {
			transform:translateY(0px);
		}
		to {
			transform:translateY(10px);
		}
	}

	@-webkit-keyframes markerMove
	{
		from {
			transform:translateY(0px);
		}
		to {
			transform:translateY(10px);
		}
	}
</style>