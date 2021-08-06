<template>
	<div class='headerModel'>
		<!--菜单列表-->
		<div class='menuList'>
			<!--公司logo-->
			<img class='headerLogo xx-pointer' src='@/assets/imgs/header_logo.png' alt='箱箱' @click='routeToIndex'>
			<el-menu
				background-color='#161616'
				text-color='#ffffff'
				:default-active='activeIndex'
				class='headerNav'
				mode='horizontal'
				@select='switchMenu'
			>
				<el-submenu v-for='item in header_menu' :key='item.industryCode' class='submenu' :index='item.parentCode + "-" + item.industryCode'>
					<template slot='title'>
						{{ item.industryName }}
					</template>
					<el-menu-item v-for='sub_menu in item.subList' :key='sub_menu.industryCode' :index='sub_menu.parentCode + "-" + sub_menu.industryCode'>
						{{ sub_menu.industryName }}
					</el-menu-item>
				</el-submenu>
			</el-menu>
		</div>
		<!--登陆状态-->
		<div class='loginStatus'>
			<div v-if='!is_login' class='noLoginModel' @click='openLoginDialog'>
				登陆 / 注册
			</div>
			<div v-if='is_login' class='userMenuArea' @mouseover='hover = true' @mouseleave='hover = false'>
				<img class='userHeadImg' src='@/assets/imgs/user_default_head.png'>
				<div v-show='hover' class='menuContainer'>
					<div class='userMenu'>
						<div class='perMenu'>
							<nuxt-link to='/user'>
								账号信息
							</nuxt-link>
						</div>
						<div class='perMenu'>
							<nuxt-link to='/user/order'>
								订单中心
							</nuxt-link>
						</div>
						<div class='perMenu'>
							地址管理
							<nuxt-link to='/user/address'>
								地址管理
							</nuxt-link>
						</div>
						<div class='perMenu'>
							<nuxt-link to='/user/authenticate'>
								企业认证
							</nuxt-link>
						</div>
						<div class='perMenu logoutButton' @click='logout'>
							退出
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HeaderModel',
	props: [],
	data () {
		return {
			is_login: false,
			activeIndex: '',
			// 顶部菜单产品类目数据
			header_menu: [],
			// 用户登录后hover头像显示菜单与否
			hover: false
		}
	},
	beforeCreate () {
		console.log('header:beforeCreate')
	},
	created () {
		console.log('header:created')
	},
	beforeMount () {
		console.log('header:beforeMount')
	},
	mounted () {
		this.is_login = this.$cookies.get('token')
		// 获取菜单列表
		this.$API_INDEX().get_header_menu().then(data => {
			console.log('header:', data)
			if (data) {
				this.header_menu = data[0].subList
			}
		})
	},
	methods: {
		/**
		 * @description 打开登陆窗口
		 */
		openLoginDialog () {
			this.$store.commit('showLoginDialog')
		},
		/**
		 * @description 切换产品类目
		 */
		switchMenu (index) {
			// 激活当前菜单
			this.activeIndex = index
			// 修改路由
			this.$router.push({ path: '/', query: { product_type: index } })
		},
		/**
		 * @description 用户登出
		 */
		logout () {
			this.$cookies.remove('token')
			this.$cookies.remove('user_info')
			// 如果在首页
			if (this.$route.path === '/') {
				location.reload()
			} else {
				this.$router.push('/')
			}
		},
		/**
		 * @description 跳转到首页
		 */
		routeToIndex () {
			this.$router.push('/')
		}
	}
}
</script>
<style lang="scss" scoped>
    .headerModel {
		padding-left:80px;
		padding-right:80px;
		display: flex;
        position: sticky;
        top:0;
		justify-content:space-between;
		align-items: center;
        width:100%;
        height:64px;
        z-index: 100;
        background-color: #161616;
		.menuList{
			display: flex;
			align-items: center;
		}
		.headerLogo{
			width:110px;
			height:30px;
		}
		.headerNav{
			margin-left:72px;
			font-size: 16px;
			border:0;
		}
		.loginStatus{
			color:#ffffff;
			cursor:pointer;
			.noLoginModel{
				width:104px;
				height:40px;
				background-color: #67a92a;
				text-align: center;
				line-height:40px;
				border-radius: 4px;
			}
		}
		.userMenuArea{
			position: relative;
			width:120px;
			height:60px;
			line-height:60px;
			text-align: center;
		}
		.menuContainer{
			position: absolute;
			z-index: 1;
			top:56px;
			right:-40px;
			width:184px;
			height:250px;
		}
		.userHeadImg{
			vertical-align: middle;
			width:28px;
			height:28px;
			text-align: center;
			border-radius: 50%;
		}
		.userMenu{
			width:184px;
			height:232px;
			border-radius: 4px;
			background-color: #ffffff;
			color:#666666;
			padding-top:16px;
			margin-top:10px;
			.perMenu{
				line-height: 40px;
				transition:all 0.3s;
				padding-left:16px;
				text-align: left;
			}
			.perMenu:hover{
				background-color: #f5f5f5;
			}
			.logoutButton{
				border-top:1px solid #EDEDED;
			}
		}
    }
</style>