<template>
	<div class='defaultLayout'>
		<!--登陆对话框-->
		<el-dialog
			:visible='is_show_login_dialog'
			class='loginDailog'
			width='500px'
			height='740px'
			@close='closeDialog'
		>
			<CompLogin :is-dialog='true' />
			<!-- <span>登陆</span>
			<span slot='footer' class='dialog-footer'>
				<el-button @click='closeDialog'>取 消</el-button>
				<el-button type='primary' @click='submitLogin'>确 定</el-button>
			</span> -->
		</el-dialog>
		<!--留资对话框-->
		<el-dialog
			title='免费试用产品'
			:visible='is_show_leave_message_dialog'
			class='loginDailog'
			width='568px'
			height='538px'
			@close='closeLeaveMessageDialog'
		>
			<LeaveMessageDialog />
		</el-dialog>
		<!--这里是首页等页面的base-layout-->
		<Header />
		<nuxt />
		<Footer />
	</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CompLogin from '@/components/login/CompLogin'
import LeaveMessageDialog from '@/components/index/LeaveMessageDialog'
import { mapState } from 'vuex'

export default {
	name: 'IndexLayout',
	components: { Header, Footer, CompLogin, LeaveMessageDialog },
	asyncData (context) {
		console.log('layout-asyncData')
		context.app.$cookies.set('lhl', '8429482480294820420')
		// 获取顶部菜单nav列表
		// 获取菜单列表
		context.app.$API_INDEX().get_header_menu().then(data => {
			console.log('header:', data)
			if (data) {
				console.log('server拿到header数据：', data)
				return { headerMenu: data[0].subList }
			}
		})
	},
	data () {
		return {
		}
	},
	computed: {
		...mapState({
			is_show_login_dialog: state => state.is_show_login_dialog,
			is_show_leave_message_dialog: state => state.is_show_leave_message_dialog
		})
	},
	mounted () {
		console.log('默认layout')
	},
	methods: {
		/**
		 * @description 提交登陆信息
		 */
		submitLogin () {
			this.$store.commit('hideLoginDialog')
		},
		/**
		 * @description 关闭登陆信息
		 */
		closeDialog () {
			this.$store.commit('hideLoginDialog')
		},
		closeLeaveMessageDialog () {
			this.$store.commit('hideLeaveMessageDialog')
		}
	}
}
</script>