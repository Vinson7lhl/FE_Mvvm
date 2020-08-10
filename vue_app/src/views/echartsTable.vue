
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
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					},
					yAxis: {
						type: 'value',
					},
					series: [
						{
							data: [820, 932, 901, 934, 1290, 1330, 1320],
							type: 'line',
							areaStyle: {},
						},
					],
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
		},
		components: {},
	}
</script>
<style lang="scss" scoped>
	.dashboard1 {
		width: 300px;
		height: 300px;
	}
	.dashboard2 {
		width: 300px;
		height: 300px;
	}
</style>
