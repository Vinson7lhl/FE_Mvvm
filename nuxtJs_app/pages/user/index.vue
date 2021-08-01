<template>
	<div>
		<xx-card>
			<template #header>
				<span>账号信息</span>
			</template>
			<div class='xx-d-flex xx-flex-col xx-flex-items-center'>
				<!-- 头像 -->
				<xx-upload-avatar class='uploadAvatar' @uploaded='uploaded'>
					<el-avatar :size='88' :src='userAvatar'>
						<img src='@/assets/imgs/user/profile.png'>
					</el-avatar>
				</xx-upload-avatar>
				<!-- 用户名 -->
				<!-- <div class='xx-d-flex xx-flex-items-center'>
					<div v-show='!isEditingUserName' class='xx-d-flex xx-flex-items-center xx-mt-2'>
						<span>{{ userInfo.userName }}</span>
						<el-button type='text' class='custom-el-button-text xx-ml-1' @click='handleEditUserName'>
							修改
						</el-button>
					</div>
					<div v-show='isEditingUserName' class='xx-mt-2 editUserNameContainer'>
						<el-input ref='editUserName' v-model='editUserName' placeholder='请输入用户名' @blur='hangdleUserNameBlur' />
					</div>
				</div> -->
			</div>
			<div class='xx-mt-4'>
				<h2>基本信息</h2>
				<el-form
					ref='userCompanyInfo'
					label-width='160px'
					:rules='rules'
					:model='userInfo'
					class='userInfoForm xx-mt-3'
				>
					<el-form-item label='企业名称' prop='companyName' class='xx-d-flex xx-flex-items-center'>
						<div class='xx-d-flex xx-flex-items-center'>
							<el-input v-model='editCompanyName' :disabled='!!userInfo.auditStatus' placeholder='请输入企业全称' />
							<xx-authentication-notice :authentication='!!userInfo.auditStatus' />
						</div>
					</el-form-item>
				</el-form>
				<div v-if='!dialogTelInfoFormVisible' class='xx-d-flex xx-flex-items-center displayDataContainer'>
					<p class='displayDataLabel xx-pl-2'>
						手机号
					</p>
					<div class='xx-d-flex xx-flex-items-center'>
						<div class='points xx-d-flex xx-flex-items-center'>
							{{ telInfo.userMobile }}
						</div>
						<el-button type='text' class='custom-el-button-text xx-ml-1' @click='dialogTelInfoFormVisible = true'>
							修改
						</el-button>
					</div>
				</div>
				<el-form
					v-else
					ref='telInfo'
					label-width='160px'
					:rules='telInfoRules'
					:model='telInfo'
					class='userInfoForm xx-mt-3'
				>
					<el-form-item label='手机号' prop='tel' class='xx-d-flex xx-flex-items-center'>
						<el-input v-model='telInfo.userMobile' placeholder='请输入手机号' />
					</el-form-item>
					<el-form-item label='验证码' prop='verification' class='xx-d-flex xx-flex-items-center'>
						<el-input v-model='telInfo.verification' placeholder='请输入验证码' class='verificationCodeInput'>
							<span v-if='!show60' slot='suffix' class='verificationCodeAction' @click='getVerificationCode'>获取验证码</span>
							<span v-else slot='suffix' class='show60Text'>{{ show60Text }}</span>
						</el-input>
					</el-form-item>
					<el-button type='primary' @click='onSubmit("telInfo")'>
						保存
					</el-button>
				</el-form>
			</div>
		</xx-card>

		<xx-card class='xx-b-t'>
			<h2>登录密码</h2>
			<div v-if='!dialogFormVisible' class='xx-d-flex xx-flex-items-center displayDataContainer'>
				<p class='displayDataLabel xx-pl-2'>
					原密码
				</p>
				<div class='xx-d-flex xx-flex-items-center'>
					<div class='points xx-d-flex xx-flex-items-center'>
						<em />
						<em />
						<em />
						<em />
						<em />
						<em />
					</div>
					<el-button type='text' class='custom-el-button-text' @click='dialogFormVisible = true'>
						修改
					</el-button>
				</div>
			</div>
			<el-form
				v-if='dialogFormVisible'
				ref='updatePwdForm'
				:rules='pwdRules'
				:model='updatePwdForm'
				label-width='160px'
				class='updatePwdForm xx-mt-2'
			>
				<el-form-item label='原密码' prop='oldPwd'>
					<el-input v-model='updatePwdForm.oldPwd' show-password autocomplete='off' placeholder='请输入原密码' />
				</el-form-item>
				<el-form-item label='新密码' prop='newPwd'>
					<el-input v-model='updatePwdForm.newPwd' show-password placeholder='请输入新密码' />
				</el-form-item>
				<el-form-item label='确认密码' prop='confirmPwd'>
					<el-input v-model='updatePwdForm.confirmPwd' show-password placeholder='请确认密码' />
				</el-form-item>
				<el-button type='primary' @click='updatePwd("updatePwdForm")'>
					保存
				</el-button>
			</el-form>
		</xx-card>
	</div>
</template>

<script>
import profile from '@/assets/imgs/user/profile.png'

export default {
	name: 'UserIndex',
	components: {
		'xx-card': () => import('@/components/user/XxCard.vue'),
		'xx-upload-avatar': () => import('@/components/user/XxUploadAvatar.vue'),
		'xx-authentication-notice': () => import('@/components/user/XxAuthenticationNotice.vue')
	},
	layout: 'default',
	data () {
		// 检查新密码和确认密码是否一致
		const checkPwd = (rule, value, callback) => {
			if (this.updatePwdForm.newPwd !== value) {
				return callback(new Error('两次输入密码不一致'))
			}
			return callback()
		}
		// 校验新密码
		const checkNewPwd = (rule, value, callback) => {
			const re = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
			if (!re.test(value) || value.trim().length < 6 || value.trim().length) {
				return callback(new Error('6-16个字符，需包含字母、数字或特殊符号中的至少两种'))
			}
			return callback()
		}
		// 校验手机号
		const checkTel = (rule, value, callback) => {
			const re = /^1\d{10}$/
			if (!re.test(value)) {
				return callback(new Error('手机号输入有误'))
			}
			return callback()
		}
		return {
			isEditingUserName: false,
			userInfo: {
				auditStatus: 1,
				companyName: '',
				photoUrl: '',
				userMobile: ''
			},
			telInfo: {
				userMobile: '',
				verification: ''
			},
			telInfoRules: {
				tel: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
					{ validator: checkTel, trigger: 'change' }
				],
				verification: [
					{ required: true, message: '请输入验证码', trigger: 'blur' }
				]
			},
			rules: {
				companyName: [
					{ required: true, message: '请输入企业名称', trigger: 'blur' },
					{ max: 30, message: '最大长度为30个字符', trigger: 'blur' }
				]
			},
			pwdRules: {
				oldPwd: [
					{ required: true, message: '请输入原密码', trigger: 'blur' }
				],
				newPwd: [
					{ required: true, message: '请输入新密码', trigger: 'blur' },
					{ validator: checkNewPwd, trigger: 'change' }
				],
				confirmPwd: [
					{ required: true, message: '请再次输入密码', trigger: 'blur' },
					{ validator: checkPwd, trigger: 'change' }
				]
			},
			dialogFormVisible: false,
			updatePwdForm: {
				oldPwd: '',
				newPwd: '',
				confirmPwd: ''
			},
			dialogTelInfoFormVisible: false,
			editUserName: '',
			editCompanyName: '',
			wait: 60,
			clockSet: '',
			show60: false,
			show60Text: ''
		}
	},
	computed: {
		userAvatar () {
			if (this.userInfo.photoUrl) { return this.userInfo.photoUrl }
			return profile
		}
	},
	mounted () {
		const breadcrumb = [
			{ label: '首页', path: '/' },
			{ label: '账号信息' }
		]
		// 设置当前页面的面包屑导航
		this.$parent.setBreadcrumb(breadcrumb)

		this.editUserName = this.userInfo.userName
		sessionStorage.setItem('previousLocation', 'order')
		this.userInfo = { ...this.$cookies.get('user_info') }
		this.telInfo.userMobile = this.userInfo.userMobile
		console.log(this.userInfo)
		this.editCompanyName = this.userInfo.companyName
	},
	methods: {
		uploaded (imgSrc) {
			console.log(imgSrc)
		},
		handleEditUserName () {
			this.isEditingUserName = true
			this.$nextTick(() => {
				this.$refs.editUserName.focus()
			})
		},
		hangdleUserNameBlur () {
			this.isEditingUserName = false
			// todo: 是否失焦保存
		},
		getVerificationCode () {
			this.time60Code()
		},
		time60Code () {
			if (!this.clockSet) {
				let wait = this.wait
				this.show60Text = `${wait} 秒后再获取`
				this.show60 = true
				this.clockSet = setInterval(() => {
					if (wait === 0) {
						this.show60 = false
						clearInterval(this.clockSet)
						this.clockSet = null
					} else {
						this.show60Text = `${wait} 秒后再获取`
						wait--
					}
				}, 1000)
			}
		},
		onSubmit (formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					console.log('update user info')
					this.$message({
						message: '恭喜你，这是一条成功消息',
						type: 'success',
						duration: 0
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		updatePwd (formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					console.log('update user info')
					this.$message({
						message: '恭喜你，这是一条成功消息',
						type: 'success',
						duration: 0
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		handleUpdatePwd () {
			this.dialogFormVisible = false
			// todo:发起请求
		}
	}
}
</script>
<style lang='scss' scoped>
    .uploadAvatar{
        width: 88px;height: 88px;
        border-radius: 100%;
        overflow: hidden;
        cursor: pointer;
    }
    .custom-el-button-text{
        padding: 0;
        color: #0E7AFF;
        min-width: unset;
    }
    .editUserNameContainer{
        width: 400px;
    }
    h2{
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 500;
        color: #2C2C2C;
        line-height: 22px;
    }
    .points{
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
        em{
            margin-right: 6px;
            width: 8px;
            height: 8px;
            background: #2C2C2C;
            border-radius: 100%;
        }
    }
    .displayDataContainer{
        margin-top: 14px;
    }
    .displayDataLabel{
        width: 160px;
        padding-right: 24px;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
    }
    .verificationCodeAction,.show60Text{
        cursor: pointer;
        font-size: 12px;
        font-weight: 400;
        color: #67A92A;
        line-height: 17px;
    }
    .show60Text{
        color: #b3e19d;
    }
</style>
<style lang='scss'>
.userInfoForm{
    .el-form-item__label{
        text-align: left;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
    }
    .el-form-item{
        margin-bottom: 32px;
    }
    .el-input{
        max-width: 400px;
    }
    .el-form-item__content{
        flex: 1 1 auto;
        margin-left: 0 !important;
    }
    .el-form-item__label{
        padding-right: 24px;
    }
}
.el-form.updatePwdForm{
    .el-form-item{
        display: flex;
        align-items: center;
        margin-bottom: 32px;
    }
    .el-form-item__label{
        text-align: left;
    }
    .el-form-item__content{
        margin-left: 0 !important;
        flex: 1 1 auto;
    }
    .el-input{
        max-width: 400px;
    }
}

.editUserNameContainer{
    .el-input{
        text-align: center;
        .el-input__inner{
            height: 40px;
            width: auto;
            padding: 0;
            min-width: unset;
            line-height: 1;
            border: none;
            text-align: center;
        }
    }
}
.verificationCodeInput.el-input--suffix{
    .el-input__inner{
        padding-right: 84px;
    }
    .el-input__suffix{
        display: flex;
        align-items: center;
    }
}
</style>