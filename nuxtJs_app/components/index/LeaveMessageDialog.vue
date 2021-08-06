<!--登录页以及注册页面组件-->
<template>
	<div class='leaveMessageContent xx-radius'>
		<span class='tips'>我们将承诺为您提供最长3个月的产品免费试用时间</span>
		<div class='inputModel'>
			<div class='labelModel'>
				<span class='nece'>*</span>试用产品
			</div>
			<el-select v-model='product_id' class='normalInput' placeholder='请选择产品' size='medium'>
				<el-option
					v-for='item in product_list'
					:key='item.id'
					:label='item.productName'
					:value='item.id'
				/>
			</el-select>
		</div>
		<div class='inputModel'>
			<div class='labelModel'>
				<span class='nece'>*</span>手机号
			</div>
			<el-input v-model='user_phone' maxlength='11' class='normalInput' placeholder='请输入手机号' size='medium' />
		</div>
		<div class='inputModel'>
			<div class='labelModel'>
				<span class='nece notNece'>*</span>怎么称呼您
			</div>
			<el-input v-model='user_nick_name' class='normalInput' placeholder='请输入您的姓名' size='medium' />
		</div>
		<div class='inputModel'>
			<div class='labelModel'>
				<span class='nece notNece'>*</span>公司名称
			</div>
			<el-input v-model='firm_name' class='normalInput' placeholder='请输入您的公司名' size='medium' />
		</div>
		<div class='buttonsGroup'>
			<div class='cancelButton' @click='closeThisDialog'>
				取消
			</div>
			<div class='baseButton' @click='submitThisDialog'>
				立即申请
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data () {
		return {
			product_list: '',
			// 试用的产品的名
			product_id: '',
			// 手机号
			user_phone: '',
			// 昵称
			user_nick_name: '',
			// 公司名
			firm_name: ''

		}
	},
	computed: {
		...mapState({
			is_show_leave_message_dialog: state => state.is_show_leave_message_dialog
		})
	},
	watch: {
		/**
		 * @description 监听每次打开都要初始化一次表单
		 */
		is_show_leave_message_dialog (val) {
			if (val) {
				this.initData()
			}
		}
	},
	mounted () {
		// 获取留咨产品列表
		this.$API_INDEX().get_temp_info_product_list().then(data => {
			if (data) {
				this.product_list = data.productList
			}
		})
	},
	methods: {
		/**
		 * @description 验证手机号
		 * @param { string } number 手机号字符串
		 */
		verifyPhoneNum (number) {
			if (number.trim() === '') {
				this.$message.error('手机号不能为空！')
				return false
			}
			if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(number)) {
				this.$message.error('请输入正确的手机号！')
				return false
			}
			return true
		},
		/**
		 * @description 关闭dialog
		 */
		closeThisDialog () {
			this.$store.commit('hideLeaveMessageDialog')
		},
		/**
		 * @description 提交留咨表单
		 */
		submitThisDialog () {
			if (this.product_id === '') {
				this.$message.error('请选择一个产品')
				return
			}
			let is_phone_ok = this.verifyPhoneNum(this.user_phone)
			if (is_phone_ok) {
				this.$API_INDEX().post_temp_info({
					consultationType: '免费试用',
					demand: this.product_id,
					phone: this.user_phone,
					contacts: this.user_nick_name,
					companyName: this.firm_name
				}).then(data => {
					if (data) {
						this.$store.commit('hideLeaveMessageDialog')
						this.$message.success('信息已经提交，请耐心等待！')
					}
				})
			}
		},
		initData () {
			this.product_name = ''
			this.user_phone = ''
			this.user_nick_name = ''
			this.firm_name = ''
		}
	}
}
</script>
<style lang="scss" scoped>
.leaveMessageContent{
	.inputModel{
		display: flex;
		align-items: center;
		margin: 32px 0;
	}
	.tips{
		color:#999999;
	}
	.normalInput{
		width:400px;
	}
	.labelModel{
		display: flex;
		align-items: center;
		margin-right:48px;
		width:88px;
	}
	.nece{
		color:#F74141;
		margin-right:8px;
	}
	.notNece{
		color:#ffffff;
	}
	.buttonsGroup{
		margin-top:84px;
		display: flex;
		justify-content: flex-end;
	}
	.baseButton, .cancelButton{
		width:104px;
		line-height:40px;
		text-align: center;
		margin-top:80px;
		background-color: #67A92A;
		transition:all 0.3s;
		color:#ffffff;
		border-radius: 4px;
		cursor: pointer;
	}
	.cancelButton{
		background-color: #ffffff;
		color:#666666;
		border:1px solid #DBDBDB;
		margin-right:16px;
	}
}
</style>
