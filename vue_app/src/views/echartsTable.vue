
<template>
  <div id="dash_borad">
    <div class="dashboard1" ref="echarts_container1"></div>
    <div class="dashboard2" ref="echarts_container2"></div>
  </div>
</template>

<script>
	export default {
		name: 'dashboard-page',
		data() {
			return {}
		},
		mounted() {
			console.log('进入dashboard')
			this.initCharts()
		},
		methods: {
			initCharts() {
				// 基于准备好的dom，初始化echarts实例
				var _this = this
				let myChart1 = this.$Echarts.init(_this.$refs.echarts_container1)
				// 绘制图表
				myChart1.setOption({
					// 设置全局字体
					textStyle: {
						fontFamily: 'Arial',
					},
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
							'2020-02',
						],
						// x坐标轴线是否显示
						axisLine: {
							show: false,
						},
						// x坐标轴刻度是否显示
						axisTick: {
							show: false,
						},
						// x轴坐标label文本设置
						axisLabel: {
							// 字体大小10
							fontSize: 10,
							// 距离顶部20
							padding: [20, 0, 0, 0],
							color: '#ffffff',
						},
					},
					yAxis: {
						// y轴的标题名
						name: '点数',
						// y轴的标题名样式，因为要让名字在量度顶部，调整padding-left:-80
						nameTextStyle: {
							color: '#ffffff',
							padding: [0, 0, 0, -80],
						},
						type: 'value',
						// y坐标轴线是否显示
						axisLine: {
							show: false,
						},
						// y坐标轴刻度是否显示
						axisTick: {
							show: false,
						},
						// y轴坐标label文本设置
						axisLabel: {
							// 字体大小10
							fontSize: 10,
							// 距离顶部20
							padding: [0, 20, 0, 0],
							color: '#ffffff',
						},
						// 不要显示y轴的分割线
						splitLine: {
							show: false,
						},
					},
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
								921,
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
								color: '#A634EF',
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
											color: 'rgb(224,109,255)',
										},
										{
											offset: 1,
											color: 'rgb(140,84,255, 0.1)',
										},
									],
									global: false, // 缺省为 false
								},
							},
						},
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
								show: false,
							},
						},
						// 提示框内边距 [上 右 下 左]
						padding: [0, 5, 0, 5],
						// 背景色
						backgroundColor: '#A634EF',
						// 文本样式
						textStyle: {
							color: '#ffffff',
							fontWeight: 'bold',
							fontSize: 23,
						},
						// 数据格式化，此处为 123456 => 123,456
						formatter: (params) => {
							return _this.numFormat(params[0].data)
						},
					},
				})

				// 基于准备好的dom，初始化echarts实例
				let myChart2 = this.$Echarts.init(_this.$refs.echarts_container2)
				// 绘制图表
				myChart2.setOption({
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)',
					},
					legend: {
						orient: 'vertical',
						left: 10,
						data: [
							'直接访问',
							'邮件营销',
							'联盟广告',
							'视频广告',
							'搜索引擎',
						],
					},
					series: [
						{
							name: '访问来源',
							type: 'pie',
							radius: ['50%', '70%'],
							avoidLabelOverlap: false,
							label: {
								show: false,
								position: 'center',
							},
							emphasis: {
								label: {
									show: true,
									fontSize: '30',
									fontWeight: 'bold',
								},
							},
							labelLine: {
								show: false,
							},
							data: [
								{ value: 335, name: '直接访问' },
								{ value: 310, name: '邮件营销' },
								{ value: 234, name: '联盟广告' },
								{ value: 135, name: '视频广告' },
								{ value: 1548, name: '搜索引擎' },
							],
						},
					],
				})
			},
			numFormat(num) {
				var res = num.toString().replace(/\d+/, function (n) {
					// 先提取整数部分
					return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
						return $1 + ','
					})
				})
				return res
			},
		},
		components: {},
	}
</script>
<style lang="scss" scoped>
	.dashboard1 {
		width: 760px;
		height: 300px;
		background-color: #47059c;
		border-radius: 14px;
	}
	.dashboard2 {
		width: 300px;
		height: 300px;
	}
</style>
