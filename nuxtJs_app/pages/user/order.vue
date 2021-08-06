<template>
	<div>
		<xx-card>
			<template #header>
				<div class='xx-d-flex xx-justify-between xx-flex-items-center'>
					<span>订单中心</span>
					<el-button class='defaultPrimary'>
						快捷下单
					</el-button>
				</div>
			</template>
			<filter-tabs v-model='filter.type' :data='filterTabs' style='margin-top:-28px' @change='handleFilterTypeChange' />
			<div />
		</xx-card>
	</div>
</template>
<script>
export default {
	name: 'OrderPage',
	components: {
		'xx-card': () => import('@/components/user/XxCard.vue'),
		'filter-tabs': () => import('@/components/user/FilterTabs.vue')
	},
	data () {
		return {
			filterTabs: [
				{
					value: '',
					label: '全部订单'
				},
				{
					value: 1,
					label: '待支付'
				},
				{
					value: 2,
					label: '已确认'
				},
				{
					value: 3,
					label: '已取消'
				}
			],
			filter: {
				type: ''
			}
		}
	},
	methods: {
		handleFilterTypeChange (val) {
			console.log(val, 'filter value')
		}
	}
}
</script>
<style lang="scss" scoped>

</style>