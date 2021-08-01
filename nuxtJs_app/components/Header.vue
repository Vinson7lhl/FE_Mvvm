<template>
	<div class='headerModel'>
		<!--菜单列表-->
		<div class='menuList'>
			<!--公司logo-->
			<img class='headerLogo' src='@/assets/imgs/header_logo.png' alt='箱箱'>
			<!--农副食品-->
			<el-dropdown class='dropdownMenu' :show-timeout='50'>
				<span class='dropdownName'>
					<span class='mainMenuName'>农副食品</span><i class='el-icon-arrow-down el-icon--right' />
				</span>
				<el-dropdown-menu slot='dropdown'>
					<el-dropdown-item class='perDetailMenu'>
						黄金糕
					</el-dropdown-item>
					<el-dropdown-item class='perDetailMenu'>
						狮子头
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<!--酒水饮料-->
			<el-dropdown trigger='click' class='dropdownMenu'>
				<span class='dropdownName'>
					酒水饮料<i class='el-icon-arrow-down el-icon--right' />
				</span>
				<el-dropdown-menu slot='dropdown'>
					<el-dropdown-item class='perDetailMenu'>
						黄金糕
					</el-dropdown-item>
					<el-dropdown-item>狮子头</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<!--调味制品-->
			<el-dropdown trigger='click' class='dropdownMenu'>
				<span class='dropdownName'>
					调味制品<i class='el-icon-arrow-down el-icon--right' />
				</span>
				<el-dropdown-menu slot='dropdown'>
					<el-dropdown-item class='perDetailMenu'>
						黄金糕
					</el-dropdown-item>
					<el-dropdown-item>狮子头</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<!--化学制品-->
			<el-dropdown trigger='click' class='dropdownMenu'>
				<span class='dropdownName'>
					化学制品<i class='el-icon-arrow-down el-icon--right' />
				</span>
				<el-dropdown-menu slot='dropdown'>
					<el-dropdown-item class='perDetailMenu'>
						黄金糕
					</el-dropdown-item>
					<el-dropdown-item>狮子头</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<!--油脂产品-->
			<el-dropdown trigger='click' class='dropdownMenu'>
				<span class='dropdownName'>
					油脂产品<i class='el-icon-arrow-down el-icon--right' />
				</span>
				<el-dropdown-menu slot='dropdown'>
					<el-dropdown-item class='perDetailMenu'>
						黄金糕
					</el-dropdown-item>
					<el-dropdown-item>狮子头</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<!--登陆状态-->
		<div class='loginStatus'>
			<div v-if='!is_login' class='noLoginModel' @click='openLoginDialog'>
				登陆 / 注册
			</div>
			<img v-else class='userHeadImg' src='@/assets/imgs/user_default_head.png'>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HeaderModel',
	props: [],
	data () {
		return {
			login_name: '欧阳锋',
			is_login: false
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
		console.log('header:mounted')
		this.login_name = '白七爷'
		this.is_login = this.$cookies.get('token')
	},
	methods: {
		/**
		 * @description 打开登陆窗口
		 */
		openLoginDialog () {
			this.$store.commit('showLoginDialog')
		}
	}
}
</script>
<style lang="scss">
	// .perDetailMenu:focus, .perDetailMenu:not(.is-disabled):hover {
	// 	background-color: #000000;
	// 	color:#ffffff;
	// }
</style>
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
		.dropdownMenu{
			margin-left:72px;
			cursor: pointer;
			font-size: 16px;
		}
		.dropdownName{
			color:#ffffff;
			.mainMenuName{
				padding-bottom:9px;
				transition:all 0.3s;
				border-bottom: 2px solid rgba(103,169,42,0);
			}
			.mainMenuName:hover{
				border-bottom: 2px solid rgba(103,169,42,1);
			}
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
		.userHeadImg{
			width:28px;
			height:28px;
			border-radius: 50%;
		}
    }
</style>
