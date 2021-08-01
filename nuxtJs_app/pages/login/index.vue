<template>
	<div class='loginPage xx-radius'>
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
		<div class='rightLoginForm'>
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
	</div>
</template>

<script>
export default {
	layout: 'login',
	data () {
		return {
			phone_number: '',
			password: ''
		}
	},
	head () {
		return {
			title: '请登陆'
		}
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
		}
	}
}
</script>
<style lang="scss" scoped>
.loginPage{
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
	.submitButton{
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
