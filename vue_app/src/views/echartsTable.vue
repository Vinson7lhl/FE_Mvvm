<template>
	<div id="dash_borad">
		<div class="dashboard1" ref="echarts_container1"></div>
		<div class="dashboard2" ref="echarts_container2"></div>
		<div class="dashboard3" ref="echarts_container3"></div>
		<div class="dashContainer">
			<div class="dashboard4" ref="echarts_container4"></div>
		</div>
		<div class="dashboard5" ref="echarts_container5"></div>
		<div class="dashContainer">
			<div class="dashboard6" ref="echarts_container6"></div>
		</div>
		<div class="dashContainer2">
			<div class="dashboard7" ref="echarts_container7"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'dashboard-page',
	data () {
		return {}
	},
	mounted () {
		console.log('进入dashboard')
		this.initCharts()
	},
	methods: {
		async initCharts () {
			// 基于准备好的容器1，折线图
			let _this = this
			let myChart1 = this.$Echarts.init(_this.$refs.echarts_container1)
			// 绘制折线图
			myChart1.setOption({
				// 决定折线图在容器内的大小，xy为偏移量
				grid: {
					left: '12%', // x 偏移量
					top: '25%', // y 偏移量
					width: '82%', // 宽度
					height: '50%' // 高度
				},
				// 设置全局字体
				textStyle: {
					fontFamily: 'Arial'
				},
				// x轴的配置
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: [
						'2019-03',
						'2019-04',
						'2019-05',
						'2019-06',
						'2019-07',
						'2019-08',
						'2019-09',
						'2019-10',
						'2019-11',
						'2019-12',
						'2020-01',
						'2020-02'
					],
					// x坐标轴线是否显示
					axisLine: {
						show: false
					},
					// x坐标轴刻度是否显示
					axisTick: {
						show: false
					},
					// x轴坐标label文本设置
					axisLabel: {
						// 字体大小10
						fontSize: 10,
						// 距离顶部20
						padding: [20, 0, 0, 0],
						color: '#ffffff'
					}
				},
				// y轴的配置
				yAxis: {
					// y轴的标题名
					name: '点数',
					// y轴的标题名样式，因为要让名字在量度顶部，调整padding-left:-80
					nameTextStyle: {
						color: '#ffffff',
						padding: [0, 0, 0, -80]
					},
					type: 'value',
					// y坐标轴线是否显示
					axisLine: {
						show: false
					},
					// y坐标轴刻度是否显示
					axisTick: {
						show: false
					},
					// y轴坐标label文本设置
					axisLabel: {
						// 字体大小10
						fontSize: 10,
						// 距离顶部20
						padding: [0, 20, 0, 0],
						color: '#ffffff'
					},
					// 不要显示y轴的分割线
					splitLine: {
						show: false
					}
				},
				// 核心数据轴的配置
				series: [
					{
						data: [
							820,
							932,
							901,
							934,
							1290,
							1330,
							1320,
							223,
							333,
							1233,
							2783,
							921
						],
						type: 'line',
						// 是否平滑过渡
						smooth: true,
						// 打点图形：空心圆
						symbol: 'emptyCircle',
						// 打点大小
						symbolSize: 8,
						// 平滑曲线的样式
						lineStyle: {
							// 线宽
							width: 3,
							color: '#A634EF'
						},
						itemStyle: {
							color: '#400093',
							borderColor: '#ffffff',
							borderWidth: 2
						},
						// 数据显示区域填充颜色
						areaStyle: {
							// 颜色线性渐变
							color: {
								// 渐变方式
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: 'rgb(224,109,255)'
									},
									{
										offset: 1,
										color: 'rgba(71,5,156,1)'
									}
								],
								global: false // 缺省为 false
							}
						}
					}
				],
				// 鼠标放上后的数据提示框
				tooltip: {
					trigger: 'axis',
					// 十字标尺
					axisPointer: {
						// 不显示十字标尺
						type: 'none',
						// 不显示标尺xy轴的label
						label: {
							show: false
						}
					},
					position: (point) => {
						return [point[0] - 35, point[1] - 60]
					},
					// 提示框内边距 [上 右 下 左]
					padding: [0, 5, 0, 5],
					// 背景色
					backgroundColor: '#A634EF',
					// 文本样式
					textStyle: {
						color: '#ffffff',
						fontWeight: 'bold',
						fontSize: 23
					},
					// 数据格式化，此处为 123456 => 123,456
					formatter: (params) => {
						return _this.numFormat(params[0].data)
					}
				}
			})

			// 基于准备好的容器2，雷达图
			let myChart2 = this.$Echarts.init(_this.$refs.echarts_container2)
			// 绘制图表
			let indicator_array = [
				{
					name: '苹果',
					max: 10000
				},
				{
					name: '鸭梨',
					max: 10000
				},
				{
					name: '菠萝',
					max: 10000
				},
				{
					name: '葡萄',
					max: 10000
				}
			]
			myChart2.setOption({
				tooltip: {
					trigger: 'item'
				},
				// 设置为雷达图
				radar: {
					// 设置雷达图指标，即有几个维度，以及最大值
					indicator: indicator_array,
					// 指雷达图中心点在容器的位置，如果是 [距离左侧的百分比，距离顶部百分比] ['50%', '50%']则恰好是中心
					center: ['50%', '50%'],
					// 雷达图半径值，可以看做是雷达图在容器中的大小
					radius: 80,
					// 是否显示分割区域，此处不显示，从而让雷达图完全透明
					splitArea: {
						show: false
					},
					// 雷达图内的分割区域线
					splitLine: {
						lineStyle: {
							// 分割线颜色
							color: '#979797'
						}
					},
					// 雷达图内指示器名维度线
					axisLine: {
						show: true,
						lineStyle: {
							color: '#979797',
							type: 'dashed',
							opacity: 0.1
						}
					},
					// 指示器名是否显示（即那几个维度名字）
					name: {
						show: true,
						textStyle: {
							color: '#000000'
						}
					},
					// 指示器名字离雷达图距离
					nameGap: 10
				},
				series: [
					{
						type: 'radar',
						// 打点图形：空心圆
						symbol: 'emptyCircle',
						// 打点大小
						symbolSize: 8,
						label: {
							show: false
						},
						areaStyle: {},
						data: [
							{
								value: [8260, 7113, 5185, 6310],
								name: '某软件',
								itemStyle: {
									// 雷达图圆点颜色
									color: '#964FFF'
								},
								// 雷达图面积颜色
								areaStyle: {
									color: '#964FFF',
									opacity: 0.8
								}
							},
							{
								value: [3920, 5553, 7128, 8790],
								name: '某软件2',
								itemStyle: {
									// 雷达图面积颜色
									color: '#02C5D7'
								},
								areaStyle: {
									color: '#02C5D7',
									opacity: 0.8
								}
							}
						],
						// 鼠标放上后的数据提示框
						tooltip: {
							trigger: 'item',
							// 提示框内边距 [上 右 下 左]
							padding: [5, 5, 5, 5],
							// 背景色
							backgroundColor: '#A634EF',
							// 文本样式
							textStyle: {
								color: '#ffffff',
								fontWeight: 'bold',
								fontSize: 18
							},
							formatter: (params) => {
								return `
									<div>${params.name}</div><div style="font-size:14px">${indicator_array[0].name} ${_this.numFormat(params.value[0])}</div>
									<div style="font-size:14px">${indicator_array[1].name} ${_this.numFormat(params.value[1])}</div>
									<div style="font-size:14px">${indicator_array[2].name} ${_this.numFormat(params.value[2])}</div>
									<div style="font-size:14px">${indicator_array[3].name} ${_this.numFormat(params.value[3])}</div>`
							}
						}
					}
				]
			})

			// 基于准备好的容器3，饼图
			let myChart3 = this.$Echarts.init(_this.$refs.echarts_container3)
			console.log('1')
			// 绘制饼图
			await myChart3.setOption({
				tooltip: {
					trigger: 'item',
					// 是否要一直显示tooltip
					alwaysShowContent: true
				},
				color: ['#19BE6B', '#ED3F14', '#A634EF', '#F8E71C', '#F5A623'],
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: ['50%', '75%'],
						avoidLabelOverlap: false,
						// 禁用鼠标触发事件
						// silent: true,
						// 鼠标hover时激活大小
						hoverOffset: 3,
						// 类型标签样式
						label: {
							show: true,
							position: 'outside',
							fontSize: 12
						},
						// 设置各个子饼图之间距离，
						itemStyle: {
							borderWidth: 5, // 边框的宽度
							borderColor: '#47059c' // 边框的颜色
						},
						// 标签和饼图线样式,首先让其不显示，其次让其第一段第二段引导线变短即可调整label与饼图距离
						labelLine: {
							show: false,
							length: 10,
							length2: 1
						},
						// 高亮后饼图，和标签样式
						emphasis: {
							label: {
								show: true,
								fontSize: '16'
							}
						},
						tooltip: {
							// 背景色
							backgroundColor: 'transparent',
							position: ['35%', '40%'],
							padding: 0,
							// 文本样式
							textStyle: {
								color: '#ffffff',
								fontWeight: 'bold',
								fontSize: 26
							},
							// formatter: '<div style="text-align:center;line-height:24px">{c}<br/><div style="font-size:14px;font-style:italic">({d})%</div></div>'
							formatter: function (params) {
								return (
									'<div style="text-align:center;width:88px">' +
										_this.numFormat(params.value) +
										'</div><div style="font-size:14px;font-style:italic;line-height:14px;text-align:center;width:88px">(' +
										params.percent +
										'%)</div>'
								)
							}
						},
						data: [
							{ value: 1153, name: '直接访问' },
							{ value: 1200, name: '邮件营销' },
							{ value: 1334, name: '联盟广告' },
							{ value: 1495, name: '视频广告' },
							{ value: 1548, name: '搜索引擎' }
						]
					}
				]
			})
			let i = 0
			setInterval(() => {
				if (i > 0) {
					myChart3.dispatchAction({
						type: 'downplay',
						dataIndex: i - 1
					})
					if (i === 5) {
						i = 0
					}
				}
				myChart3.dispatchAction({
					type: 'highlight',
					dataIndex: i
				})
				myChart3.dispatchAction({
					type: 'showTip',
					dataIndex: i,
					seriesIndex: 0,
					position: ['35%', '40%']
				})
				i++
			}, 2000)

			// 柱状图：横向滚动，310px 8个类型，以此类推
			let myChart4 = this.$Echarts.init(_this.$refs.echarts_container4)
			myChart4.setOption({
				// 决定折线图在容器内的大小，xy为偏移量
				grid: {
					left: '2%', // x 偏移量
					top: '2%', // y 偏移量
					bottom: 30,
					width: '95%', // 宽度,
					containLabel: false
				},
				xAxis: {
					type: 'category',
					data: [
						'黑龙江',
						'辽宁',
						'吉林',
						'河北',
						'内蒙',
						'山西',
						'陕西',
						'上海'
					],
					axisPointer: {
						type: 'shadow'
					},
					// x坐标轴线是否显示
					axisLine: {
						lineStyle: {
							color: '#BBBEC4'
						}
					},
					// x坐标轴刻度是否显示
					axisTick: {
						show: false
					},
					// x轴坐标label文本设置
					axisLabel: {
						// 字体大小10
						fontSize: 10,
						// 距离顶部20
						padding: [0, 0, 0, 0],
						// 强制所有x轴类别都显示
						interval: 0,
						color: '#ffffff'
					}
				},
				yAxis: [
					{
						show: false
					},
					{
						show: false
					}
				],
				series: [
					{
						name: '门店数',
						type: 'bar',
						// 设置柱子宽度
						barWidth: 14,
						itemStyle: {
							color: (e) => {
								if (e.dataIndex <= 2) {
									return '#FF9900'
								} else {
									return '#2D8CF0'
								}
							}, // or #2D8CF0(蓝)  （黄）
							// 设置柱子为圆角
							barBorderRadius: [4, 4, 0, 0]
						},
						data: [
							122.0,
							99.9,
							76.0,
							75.2,
							74.6,
							70.7,
							66.6,
							62.2
						]
					},
					{
						name: 'TGI指数',
						type: 'line',
						// 是否平滑过渡
						smooth: true,
						// 打点图形：空心圆
						symbol: 'circle',
						// 打点大小
						symbolSize: 4,
						// 平滑曲线的样式
						lineStyle: {
							type: 'dashed',
							// 线宽
							width: 1,
							color: '#ffffff'
						},
						itemStyle: {
							color: '#ffffff',
							borderColor: '#ffffff',
							borderWidth: 2,
							opacity: 0.7
						},
						data: [
							2.0,
							2.2,
							3.3,
							4.5,
							6.3,
							10.2,
							20.3,
							23.4
						]
					}
				],
				// 鼠标经过提示
				tooltip: {
					trigger: 'axis',
					// 十字线显示
					axisPointer: {
						type: 'none'
					},
					backgroundColor: 'transparent',
					// 文本样式
					textStyle: {
						color: '#ffffff',
						fontSize: 10
					},
					formatter: params => {
						return (
							'<div style="background-color:rgba(121,9,193,0.7);padding:6px; border-radius:4px;">' +
								'<div style="font-size:14px;margin-bottom:8px;font-weight:bold">' + params[0].name + '</div>' +
								'<div><span style="width:30px; display:inline-block">' + params[0].seriesName + '</span> ' + _this.numFormat(params[0].data) + '</div>' +
								'<div><span style="width:30px; display:inline-block">' + params[1].seriesName + '</span> ' + _this.numFormat(params[1].data) + ' %</div>' +
							'</div>'
						)
					}
				}
			})

			// 柱状图：没有Y轴，没有辅助线，虚线折线图，数据为二维，X轴有滚动条
			let myChart5 = this.$Echarts.init(_this.$refs.echarts_container5)
			myChart5.setOption({
				tooltip: {
					show: false
				},
				grid: {
					left: '8%',
					right: '8%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [
					{
						show: false,
						type: 'value',
						boundaryGap: true,
						axisLabel: {
							formatter: function (val) {
								return val + 100
							}
						}
					}
				],
				yAxis: {
					type: 'category',
					axisTick: {
						show: true
					},
					// Y轴偏移
					offset: 10,
					// Y轴文本样式
					axisLabel: {
						color: '#ffffff',
						fontSize: 10
					},
					data: [
						'人流量高',
						'人流量偏高',
						'人流量中',
						'人流量偏低',
						'人流量低'
					]
				},
				series: [
					{
						name: '收入',
						type: 'bar',
						stack: '总量',
						label: {
							show: true,
							position: 'right',
							fontSize: 10,
							color: '#fff'
						},
						itemStyle: {
							color: '#5CADFF',
							// borderColor: '#ffffff',
							barBorderRadius: [0, 7, 7, 0]
						},
						// 设置柱子宽度
						barWidth: 14,
						// 调节柱状图之间的距离
						// barCategoryGap: '30%',
						data: [120, 111, 141, 174, 190]
					},
					{
						name: '支出',
						type: 'bar',
						stack: '总量',
						label: {
							show: true,
							position: 'left',
							fontSize: 10,
							color: '#fff',
							formatter: (value) => {
								// 值都是负数的 所以需要取反一下
								return -value.data
							}
						},
						itemStyle: {
							color: '#ED3F14',
							// borderColor: '#ffffff',
							barBorderRadius: [7, 0, 0, 7]
						},
						data: [-20, -32, -91, -94, -90]
					}
				]
			})

			// 散点图 宽度 310 8个类型正好
			let myChart6 = this.$Echarts.init(_this.$refs.echarts_container6)
			myChart6.setOption({
				grid: {
					left: '3%',
					right: '3%',
					top: '10%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					// 是否显示轴线上的刻度
					axisTick: {
						show: false
					},
					// 是否显示轴线
					axisLine: {
						lineStyle: {
							color: '#979797'
						}
					},
					// x轴坐标label文本设置
					axisLabel: {
						// 字体大小10
						fontSize: 10,
						color: '#DDDEE1',
						// 显示所有类型
						interval: 0,
						rotate: 40
					}
				},
				yAxis: {
					// 轴线
					axisLine: {
						// 是否显示
						show: false
					},
					// 是否显示轴线上的刻度
					axisTick: {
						show: false
					},
					// y轴坐标label文本设置
					axisLabel: {
						// 字体大小10
						fontSize: 10,
						color: '#ffffff'
					},
					// x轴在grid中的分割线
					splitLine: {
						show: true,
						lineStyle: {
							type: 'dotted',
							color: '#979797'
						}
					}
				},
				series: [
					{
						data: [
							['休闲娱乐', 27.8, 122],
							['健身', 33, 112],
							['餐饮', 181, 87],
							['大型超市', 109, 19],
							['Fri', 221, 76],
							['Sat', 145, 113],
							['Sun', 271, 63],
							['超级沃尔玛', 71, 119]
						],
						type: 'scatter',
						// 控制点大小，以元数据第三个值为标准
						symbolSize: function (data) {
							return Math.sqrt(data[2]) * 2
						},
						itemStyle: {
							color: (e) => {
								console.log(e.data)
								if (e.data[2] < 100) {
									return '#ED3F14'
								} else {
									return '#5CADFF'
								}
							}
						},
						tooltip: {
							// 放格式化数据
						}
					}
				],
				// 鼠标经过提示
				tooltip: {
					trigger: 'item',
					// 十字线显示
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#ffffff'
						}
					},
					backgroundColor: 'transparent',
					// 文本样式
					textStyle: {
						color: '#ffffff',
						fontSize: 10
					},
					formatter: params => {
						return (
							'<div style="background-color:rgba(121,9,193,0.7);padding:6px; border-radius:4px;">' +
								'<div style="font-size:14px;margin-bottom:8px;font-weight:bold">' + params.data[0] + '</div>' +
								'<div><span style="width:30px; display:inline-block">门店数</span> ' + _this.numFormat(params.data[1]) + '</div>' +
								'<div><span style="width:30px; display:inline-block">TGI</span> ' + _this.numFormat(params.data[2]) + ' %</div>' +
							'</div>'
						)
					}
				}
			})

			// 柱状图（垂直滚动）273px - 8个类型正好
			let myChart7 = this.$Echarts.init(_this.$refs.echarts_container7)
			myChart7.setOption({
				grid: {
					left: '3%',
					right: '3%',
					top: 0,
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'value',
					// x坐标轴线是否显示
					axisLine: {
						show: false
					},
					// x坐标轴刻度是否显示
					axisTick: {
						show: false
					},
					// x轴坐标label文本设置
					axisLabel: {
						show: false
					},
					// x轴在grid中的分割线
					splitLine: {
						show: false
					}
				},
				yAxis: {
					type: 'category',
					data: ['道路交通', '房屋地产', '公司企业', '购物', '科教文化', '世界人口', '欧阳锋', '郭靖'],
					// y坐标轴线是否显示
					axisLine: {
						show: false
					},
					// y轴坐标label文本设置
					axisLabel: {
						// 字体大小10
						fontSize: 10,
						color: '#ffffff'
					},
					// y坐标轴刻度是否显示
					axisTick: {
						show: false
					},
					inverse: true
				},
				series: [
					{
						name: '2011年',
						type: 'bar',
						data: [18203, 23489, 29034, 104970, 131744, 630230, 33622, 99999],
						label: {
							show: true,
							position: 'insideLeft',
							fontSize: 10,
							color: '#fff'
						},
						// bar 间距
						// 设置柱子宽度
						barWidth: 18,
						itemStyle: {
							color: (e) => {
								console.log(e.data)
								if (e.dataIndex <= 2) {
									return '#FF9900'
								} else {
									return '#2D8CF0'
								}
							},
							barBorderRadius: [0, 4, 4, 0]
						}
					}
				]
			})
		},
		numFormat (num) {
			let res = num.toString().replace(/\d+/, function (n) {
				// 先提取整数部分
				return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
					return $1 + ','
				})
			})
			return res
		}
	},
	components: {}
}
</script>
<style lang="scss" scoped>
	.dashboard1 {
		width: 628px;
		height: 171px;
		background-color: #47059c;
		border-radius: 14px;
	}

	.dashboard2 {
		width: 300px;
		height: 300px;
		border-radius: 14px;
		margin-top: 20px;
		margin-left: 100px;
		background-color: #47059c;
	}

	.dashboard3 {
		width: 340px;
		height: 180px;
		border-radius: 14px;
		margin-top: 20px;
		background-color: #47059c;
	}
	.dashContainer,.dashContainer2 {
		width: 310px;
		overflow-x: auto;
		.dashboard4 {
			width: 310px;
			height: 228px;
			background-color: #47059c;
			margin-top: 20px;
		}
	}
	.dashContainer2{
		width:310px;
		height:310px;
		overflow-y: auto;
	}
	.dashboard5 {
		width: 310px;
		height: 228px;
		background-color: #47059c;
		margin-top: 20px;
	}
	.dashboard6 {
		width: 310px;
		height: 228px;
		background-color: #47059c;
		margin-top: 20px;
	}
	.dashboard7 {
		width: 100%;
		height: 273px;
		background-color: #47059c;
		margin-top: 20px;
	}
</style>
