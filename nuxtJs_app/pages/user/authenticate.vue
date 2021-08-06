<template>
	<div>
		<component :is='currentTabComponent' />
	</div>
</template>
<script>
export default {
	name: 'AuthenticatePage',
	components: {
		'certified-page': () => import('@/components/user/CertifiedPage.vue'),
		'uncertified-page': () => import('@/components/user/UncertifiedPage.vue')
	},
	data () {
		return {
			currentTabComponent: 'certified-page',
			userInfo: null
		}
	},
	computed: {

	},
	created () {
		this.userInfo = this.$cookies.get('user_info')
		const status = [1, 2]
		if (!!this.userInfo && !status.includes(this.userInfo.auditStatus) && !!this.$route.query.action) {
			this.currentTabComponent = 'uncertified-page'
		}
	},
	mounted () {
		const breadcrumb = [
			{ label: '首页', path: '/' },
			{ label: '企业认证' }
		]
		// 设置当前页面的面包屑导航
		this.$parent.setBreadcrumb(breadcrumb)
	}
}
</script>
<style lang="scss" scoped>

</style>