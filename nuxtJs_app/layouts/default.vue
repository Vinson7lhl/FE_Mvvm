<template>
	<div class='defaultLayout'>
		<!--登陆对话框-->
		<el-dialog
			title='提示'
			:visible='is_show_login_dialog'
			width='30%'
			@close='closeDialog'
		>
			<span>登陆</span>
			<span slot='footer' class='dialog-footer'>
				<el-button @click='closeDialog'>取 消</el-button>
				<el-button type='primary' @click='submitLogin'>确 定</el-button>
			</span>
		</el-dialog>
		<!--这里是首页等页面的base-layout-->
		<Header />
		<nuxt />
		<Footer />
	</div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'

export default {
	name: 'IndexLayout',
	components: { Header, Footer },
	data () {
		return {
		}
	},
	computed: {
		...mapState({
			is_show_login_dialog: state => state.is_show_login_dialog
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
		}
	}
}
</script>
<style lang='scss' scoped>
</style>