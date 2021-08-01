<template>
	<div class='profileContainer xx-pt-3'>
		<xx-breadcrumb :list='breadcrumb' />

		<div class='xx-d-flex xx-mt-3'>
			<div class='userMenu'>
				<user-menu :navs='navs' />
			</div>

			<div class='xx-flex-auto xx-ml-2 mainUserContentContainer'>
				<nuxt-child />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserPage',
	components: {
		'xx-breadcrumb': () => import('@/components/user/XxBreadcrumb.vue'),
		'user-menu': () => import('@/components/user/UserMenu.vue')
	},
	layout: 'default',
	data () {
		return {
			breadcrumb: [],
			navs: [
				{ label: '账号信息', path: '/user', icon: 'iconfont icon-a-Group21' },
				{ label: '订单中心', path: '/user/order', icon: 'iconfont icon-a-Group14' },
				{ label: '地址管理', path: '/user/address', icon: 'iconfont icon-Group' },
				{ label: '企业认证', path: '/user/authenticate', icon: 'iconfont icon-a-Group11' }
			]
		}
	},
	mounted () {

	},
	methods: {
		setBreadcrumb (data) {
			this.breadcrumb = data
		}
	}
}
</script>
<style lang='scss' scoped>
.userMenu{
    min-width: 288px;
}
.profileContainer{
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    min-height: calc(100vh - 64px);
}
.mainUserContentContainer{
    background: #FFFFFF;
}
.profileContainer{
    padding-bottom: 72px;
}
</style>