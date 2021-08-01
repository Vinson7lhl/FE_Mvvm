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
			currentTabComponent: 'uncertified-page'
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