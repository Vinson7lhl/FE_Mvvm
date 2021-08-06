<!--登录页以及注册页面组件-->
<template>
	<div class='loginRegisterComp xx-radius'>
		<!--左侧共用banner-->
		<div v-show='!is_dialog' class='leftBanner'>
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
					auto-complete='off'
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
					auto-complete='off'
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
			<div class='goToRegisterPage xx-pointer' @click='routeToRegister'>
				立即注册
			</div>
		</div>

		<!--注册-1-->
		<div v-show='current_route_name === "register"' class='rightLoginForm'>
			<div v-show='r_step === 1' class='titleName'>
				注册
			</div>
			<div v-show='r_step === 1' class='inputModel'>
				<div class='inputTitle'>
					手机号 <span class='ness'>*</span>
				</div>
				<el-input
					v-model='r_phone_number'
					auto-complete='off'
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
				<span v-show='!is_show_counter' class='forgottenPassword xx-f-12 xx-pointer' @click='getVerifyCode'>获取验证码</span>
				<!--倒计时-->
				<span v-show='is_show_counter' class='forgottenPassword xx-f-12'>{{ counter_num }}s</span>
			</div>
			<div v-show='r_step === 1' class='inputModel'>
				<div class='inputTitle'>
					企业名称
				</div>
				<el-input
					v-model='r_firm_name'
					auto-complete='off'
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

			<!--注册-2-->
			<div v-show='r_step === 2' class='titleName'>
				设置密码
			</div>
			<div v-show='r_step === 2' class='inputModel'>
				<div class='inputTitle'>
					密码 <span class='ness'>*</span>
				</div>
				<el-input
					v-model='r_password'
					auto-complete='off'
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
					auto-complete='off'
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
import md5 from 'js-md5'
import { mapState } from 'vuex'

export default {
	layout: 'login',
	data () {
		return {
			// 是否是从弹窗来登陆，默认不是
			is_dialog: false,
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
			// 循环key
			interval_key: '',
			// 注册第n步
			r_step: 1
		}
	},
	computed: {
		...mapState({
			is_show_login_dialog: state => state.is_show_login_dialog
		})
	},
	watch: {
		counter_num (val) {
			if (val === 0) {
				console.log('清除循环器')
				clearInterval(this.interval_key)
				this.is_show_counter = false
				this.counter_num = 60
			}
		},
		is_show_login_dialog (val) {
			if (val) {
				this.initData()
				this.current_route_name = 'login'
			}
		}
	},
	mounted () {
		if (this.$route.name === 'login' || this.$route.name === 'register') {
			this.current_route_name = this.$route.name
		} else {
			this.is_dialog = true
			this.current_route_name = 'login'
			// 初始化字段
			this.initData()
		}
	},
	methods: {
		initData () {
			this.phone_number = ''
			this.password = ''
			this.r_phone_number = ''
			this.r_verify_code = ''
			this.r_firm_name = ''
			this.r_password = ''
			this.r_confirm_password = ''
			this.is_agreed = false
			this.is_show_counter = false
			this.counter_num = 60
			if (this.interval_key) {
				clearInterval(this.interval_key)
			}
			this.r_step = 1
		},
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
		 * @description 提交登陆，并验证
		 */
		async login () {
			let is_phone_ok = this.verifyPhoneNum(this.phone_number)
			if (is_phone_ok) {
				if (this.password === '') {
					this.$message.error('密码不能为空！')
					return
				}
				let token = await this.$API_INDEX().post_login({
					userMobile: this.phone_number,
					userPassword: md5(this.password)
				})
				if (token) {
					// 注入token（前后端都可用）
					this.$cookies.set('token', token)
					// 根据token获取用户信息
					let user_info = await this.$API_INDEX().post_user_info({
						userMobile: this.phone_number,
						userPassword: md5(this.password),
						type: '2'
					})
					this.$cookies.set('user_info', user_info)
					// 如果是弹窗模式
					if (this.is_dialog) {
						// 重新reload页面
						location.reload()
					} else if (this.$route.query.targetUrl) {
						this.$router.push(this.$route.query.targetUrl)
					} else {
						this.$router.push('/')
					}
				} else {
					console.error('没有获取token')
				}
			}
		},
		/**
		 * @description 跳转到登录页
		 */
		routeToLogin () {
			if (this.is_dialog) {
				this.initData()
				this.current_route_name = 'login'
			} else {
				this.$router.push({ name: 'login' })
			}
		},
		/**
		 * @description 跳转到注册
		 */
		routeToRegister () {
			if (this.is_dialog) {
				this.current_route_name = 'register'
				this.r_step = 1
			} else {
				this.$router.push({ name: 'register' })
			}
		},
		/**
		 * @description 注册跳转到下一步
		 */
		goNextStep () {
			let is_phone_ok = this.verifyPhoneNum(this.r_phone_number)
			if (is_phone_ok) {
				if (this.r_verify_code.trim() === '') {
					this.$message.error('验证码不能为空！')
					return
				}
				if (this.r_verify_code.trim().length !== 6) {
					this.$message.error('验证码为6位！')
					return
				}
				if (!this.is_agreed) {
					this.$message.error('请勾选注册协议！')
					return
				}
				this.r_step = 2
			}
		},
		/**
		 * @description 后退到前一步
		 */
		goPreviousStep () {
			this.r_step = 1
		},
		/**
		 * @description 获取动态验证码
		 */
		getVerifyCode () {
			let is_phone_ok = this.verifyPhoneNum(this.r_phone_number)
			if (is_phone_ok) {
				this.$API_INDEX().post_phone_verify_code({ transNo: this.r_phone_number, sendType: '1', type: '1' }).then(data => {
					if (data) {
						this.$message.success('已发送验证码，请查收！')
						this.is_show_counter = true
						if (this.interval_key) {
							clearInterval(this.interval_key)
						}
						this.interval_key = setInterval(() => {
							this.counter_num--
						}, 1000)
					}
				})
			}
		},
		/**
		 * @description 提交注册信息，并验证
		 */
		async submitRegister () {
			if (this.r_password.trim() === '') {
				this.$message.error('密码不能为空')
				return
			}
			if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(this.r_password)) {
				this.$message.error('密码为8-16位，数字和字母组合！')
				return
			}
			if (this.r_password.trim() !== this.r_confirm_password.trim()) {
				this.$message.error('确认密码和密码不一致！')
				this.r_confirm_password = ''
				return
			}
			let data = await this.$API_INDEX().post_register({
				type: '2',
				// 手机号
				userMobile: this.r_phone_number,
				// 验证码
				messageCode: this.r_verify_code,
				// 公司名
				companyName: this.r_firm_name,
				// 密码
				userPassword: md5(this.r_password)
			})
			// 注册成功标识？
			if (data) {
				if (this.is_dialog) {
					this.initData()
					this.current_route_name = 'login'
					this.$message.success('注册成功，请登陆！')
				} else {
					this.$router.push({ name: 'login' })
				}
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.loginRegisterComp{
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
