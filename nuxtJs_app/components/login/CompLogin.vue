<!--登录页以及注册页面组件-->
<template>
	<div class='loginRegisterComp xx-radius'>
		<!--左侧共用banner-->
		<div class='leftBanner'>
			<el-carousel trigger='click' class='bannerContainer' width='500px' height='710px'>
				<el-carousel-item>
					<img class='bannerPic' src='@/assets/imgs/login_banner_01.png'>
				</el-carousel-item>
				<el-carousel-item>
					<img class='bannerPic' src='@/assets/imgs/login_banner_02.png'>
				</el-carousel-item>
				<el-carousel-item>
					<img class='bannerPic' src='@/assets/imgs/login_banner_03.png'>
				</el-carousel-item>
			</el-carousel>
			<img class='loginLogo' src='@/assets/imgs/login_logo.png'>
		</div>
		<!--登录模块-->
		<div v-show='current_route_name === "login"' class='rightLoginForm'>
			<div class='titleName'>
				登陆
			</div>
			<div class='inputModel'>
				<div class='inputTitle'>
					手机号 <span class='ness'>*</span>
				</div>
				<el-input
					v-model='phone_number'
					class='baseInput phoneInput'
					placeholder='请输入手机号'
					maxlength='11'
				/>
			</div>
			<div class='inputModel'>
				<div class='inputTitle'>
					密码 <span class='ness'>*</span>
				</div>
				<el-input
					v-model='password'
					class='baseInput passwordInput'
					type='password'
					placeholder='请输入密码'
					maxlength='11'
				/>
				<span class='forgottenPassword xx-f-12 xx-pointer'>忘记密码？</span>
			</div>
			<div class='submitButton xx-f-16' @click='login'>
				登陆
			</div>
			<div class='goToRegisterPage xx-pointer'>
				<nuxt-link to='/register'>
					立即注册
				</nuxt-link>
			</div>
		</div>
		<!--注册-1-->
		<div v-show='current_route_name === "register"' class='rightLoginForm'>
			<div v-show='r_step === 1' class='titleName'>
				注册
			</div>
			<div v-show='r_step === 2' class='titleName'>
				设置密码
			</div>
			<div v-show='r_step === 1' class='inputModel'>
				<div class='inputTitle'>
					手机号 <span class='ness'>*</span>
				</div>
				<el-input
					v-model='r_phone_number'
					class='baseInput phoneInput'
					placeholder='请输入手机号'
					maxlength='11'
				/>
			</div>
			<div v-show='r_step === 1' class='inputModel'>
				<div class='inputTitle'>
					验证码 <span class='ness'>*</span>
				</div>
				<el-input
					v-model='r_verify_code'
					class='baseInput'
					placeholder='请输入验证码'
					maxlength='6'
				/>
				<span v-show='!is_show_counter' class='forgottenPassword xx-f-12 xx-pointer'>获取验证码</span>
				<!--倒计时-->
				<span v-show='is_show_counter' class='forgottenPassword xx-f-12 xx-pointer'>60s</span>
			</div>
			<div v-show='r_step === 1' class='inputModel'>
				<div class='inputTitle'>
					企业名称
				</div>
				<el-input
					v-model='r_firm_name'
					class='baseInput'
					placeholder='请输入企业名称'
				/>
			</div>
			<div v-show='r_step === 1' class='goNext xx-f-16' @click='goNextStep'>
				下一步
			</div>
			<el-checkbox v-show='r_step === 1' v-model='is_agreed' class='rules'>
				我已阅读并同意 <span class='routeToDetailRules'>《箱箱注册协议》</span>
			</el-checkbox>
			<div v-show='r_step === 2' class='inputModel'>
				<div class='inputTitle'>
					密码 <span class='ness'>*</span>
				</div>
				<el-input
					v-model='r_password'
					class='baseInput passwordInput'
					type='password'
					placeholder='请输入密码'
					maxlength='11'
				/>
			</div>
			<div v-show='r_step === 2' class='inputModel'>
				<div class='inputTitle'>
					确认密码 <span class='ness'>*</span>
				</div>
				<el-input
					v-model='r_confirm_password'
					class='baseInput passwordInput'
					type='password'
					placeholder='请输入密码'
					maxlength='11'
				/>
				<div class='buttonsGroup'>
					<div v-show='r_step === 2' class='goPrevious xx-f-16' @click='goPreviousStep'>
						上一步
					</div>
					<div v-show='r_step === 2' class='completeRegister xx-f-16' @click='submitRegister'>
						完成注册
					</div>
				</div>
			</div>
			<div class='routeToLogin xx-mt-2 xx-pointer' @click='routeToLogin'>
				立即登录
			</div>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'login',
	data () {
		return {
			// 当前所在页面是登录/注册
			current_route_name: '',
			// 登录手机号*
			phone_number: '',
			// 登录密码*
			password: '',
			// 注册手机号*
			r_phone_number: '',
			// 注册验证码*
			r_verify_code: '',
			// 注册公司名
			r_firm_name: '',
			// 注册密码*
			r_password: '',
			// 注册确认密码*
			r_confirm_password: '',
			// 是否同意协议
			is_agreed: false,
			// 倒计时
			is_show_counter: false,
			// 倒计时时间
			counter_num: 60,
			// 注册第n步
			r_step: 1
		}
	},
	mounted () {
		this.current_route_name = this.$route.name
	},
	methods: {
		async login () {
			if (this.phone_number.trim() === '') {
				this.$message.error('手机号不能为空！')
				return
			}
			if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.phone_number)) {
				this.$message.error('请输入正确的手机号！')
				return
			}
			if (this.password === '') {
				this.$message.error('密码不能为空！')
				return
			}
			const token = await this.$API_INDEX().post_login({
				userMobile: this.phone_number,
				userPassword: this.password
			})
			this.$cookies.set('token', token)
			const user_info = await this.$API_INDEX().post_user_info()
			this.$cookies.set('user_info', user_info)
		},
		/**
		 * @description 跳转到登录页
		 */
		routeToLogin () {
			this.$router.push({ name: 'login' })
		},
		goNextStep () {
			this.r_step = 2
		},
		goPreviousStep () {
			this.r_step = 1
		},
		submitRegister () {}
	}
}
</script>
<style lang="scss" scoped>
.loginRegisterComp{
	width:1000px;
	height:710px;
	background-color: #ffffff;
	display: flex;
	.leftBanner, .rightLoginForm{
		width:500px;
		height:710px;
		position: relative;
	}
	.bannerPic{
		width:500px;
		height:710px;
	}
	.loginLogo{
		width:144px;
		height:39px;
		position: absolute;
		left:24px;
		top:24px;
		z-index: 999;
	}
	.titleName{
		font-size:24px;
		color:#2c2c2c;
		text-align: center;
		margin-top:72px;
		margin-bottom:34px;
	}
	.inputModel{
		width:320px;
		margin-left:auto;
		margin-right:auto;
		margin-bottom:34px;
		position:relative;
	}
	.inputTitle{
		margin-bottom:10px;
	}
	.baseInput{
		width:320px
	}
	.forgottenPassword{
		color:#67A92A;
		position: absolute;
		z-index: 1;
		right:6px;
		top:46px;
	}
	.buttonsGroup{
		display: flex;
		justify-content: space-between;
		width:320px;
		margin-left:auto;
		margin-right:auto;
		margin-top:40px;
	}
	.submitButton, .goNext, .goPrevious, .completeRegister{
		width:320px;
		line-height:48px;
		text-align: center;
		margin-left:auto;
		margin-right:auto;
		margin-top:40px;
		background-color: #67A92A;
		transition:all 0.3s;
		color:#ffffff;
		border-radius: 4px;
		cursor: pointer;
	}
	.goPrevious, .completeRegister{
		width:152px;
		margin-top:0;
	}
	.rules{
		width:100%;
		text-align: center;
		color:#aaaaaa;
		margin-top:55px;
	}
	.routeToDetailRules{
		color:#2889FF;
	}
	.routeToLogin{
		text-align: center;
		color:#67A92A
	}
	.submitButton:hover{
		background-color: #87CD49;
	}
	.disButton, .disButton:hover{
		background-color: #cccccc;
		cursor:not-allowed;
	}
	.goToRegisterPage{
		text-align: center;
		margin-top:16px;
		a{
			color:#67A92A;
		}
	}
}
</style>
