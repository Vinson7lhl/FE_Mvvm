<template>
	<div>
		<xx-card>
			<template #header>
				<div class='xx-d-flex xx-flex-items-center'>
					<span>企业认证</span>
					<certified-badge :certification-status='certificationStatus' />
				</div>
			</template>
			<div>
				<el-steps :space='185' :active='2' class='certificationStep xx-d-flex xx-justify-center'>
					<el-step title='上传资料' icon='iconfont icon-a-Group16' class='stepIcon'>
						<i slot='icon' class='iconfont icon-a-Group30' />
					</el-step>
					<el-step title='资料审核' icon='iconfont icon-a-Group16' class='stepIcon'>
						<i slot='icon' class='iconfont icon-a-Group13' />
					</el-step>
					<el-step title='完成认证' icon='iconfont icon-a-Group16' class='stepIcon'>
						<i slot='icon' class='iconfont icon-a-Group16' />
					</el-step>
				</el-steps>
				<div class='xx-mt-4'>
					<h2>资质文件</h2>
					<el-form
						ref='companyInfo'
						label-width='160px'
						:rules='rules'
						:model='companyInfo'
						class='userInfoForm xx-mt-3'
					>
						<el-form-item label='工商营业执照' prop='file' class='xx-d-flex'>
							<upload-license ref='uploadLicen' v-model='companyInfo.file' />
						</el-form-item>
						<el-form-item label='企业全称' prop='companyName' class='xx-d-flex xx-flex-items-center'>
							<el-input v-model='companyInfo.companyName' placeholder='需与营业执照照片保持一致' />
						</el-form-item>
						<el-form-item label='统一社会信用代码' prop='code' class='xx-d-flex xx-flex-items-center'>
							<el-input v-model='companyInfo.code' placeholder='需与营业执照上的注册号或统一社会信用代码一致' />
						</el-form-item>
					</el-form>
				</div>
			</div>
		</xx-card>

		<xx-card class='xx-b-t'>
			<h2 class='xx-d-flex xx-flex-items-center'>
				<span>对公银行账号信息</span>
				<span class='badgeText xx-ml-2'>（用于公对公开票）</span>
			</h2>
			<el-form ref='bankInfo' label-width='160px' :model='companyInfo' class='userInfoForm xx-mt-3'>
				<el-form-item label='开户名称' class='xx-d-flex xx-flex-items-center'>
					<div class='xx-d-flex xx-flex-items-center'>
						<el-input v-model='companyInfo.accountName' placeholder='需与主体证件上的公司名称保持一致' />
					</div>
				</el-form-item>
				<el-form-item label='开户银行' class='xx-d-flex xx-flex-items-center'>
					<el-input v-model='companyInfo.bankAccount' placeholder='需与公司银行账号开户银行的名称一致' />
				</el-form-item>
				<el-form-item label='对公银行账号' class='xx-d-flex xx-flex-items-center'>
					<el-input v-model='companyInfo.bankNumber' placeholder='需与与公司主体的银行账号一致' />
				</el-form-item>
				<el-form-item label='地址' class='xx-d-flex xx-flex-items-center'>
					<el-input v-model='companyInfo.adress' placeholder='用于发票寄送的地址信息' />
				</el-form-item>
				<el-form-item label='详细地址' class='xx-d-flex'>
					<el-input
						v-model='companyInfo.detailedAddress'
						class='detailedAddress'
						type='textarea'
						:autosize='{ minRows: 2}'
						placeholder='请输入详细地址'
					/>
				</el-form-item>
			</el-form>
			<div class='xx-d-flex xx-flex-items-center xx-mt-4'>
				<el-button type='primary' @click='onSubmit("companyInfo")'>
					提交认证
				</el-button>
				<el-button v-if='showCancelCertified' @click='handleCancelCertified'>
					取消
				</el-button>
			</div>
		</xx-card>
	</div>
</template>
<script>

export default {
	name: 'UncertifiedPage',
	components: {
		'xx-card': () => import('@/components/user/XxCard.vue'),
		'certified-badge': () => import('@/components/user/CertifiedBadge.vue'),
		'upload-license': () => import('@/components/user/UploadLicense.vue')
	},
	data () {
		const checkCode = (rule, value, callback) => {
			const re = /^[0-9a-zA-Z]*$/
			if (!re.test(value)) {
				return callback(new Error('统一社会信用代码只能由数字和字母组成'))
			}
			if (value.trim().length !== 16) {
				return callback(new Error('统一社会信用代码长度为16'))
			}
			return callback()
		}

		return {
			certificationStatus: 3,
			step: 1,
			companyInfo: {
				file: '',
				code: '',
				companyName: '',
				accountName: '',
				bankAccount: '',
				bankNumber: '',
				adress: '',
				detailedAddress: ''
			},
			rules: {
				companyName: [
					{ required: true, message: '请输入企业名称', trigger: 'change' },
					{ max: 30, message: '最大长度为30个字符', trigger: 'change' }
				],
				code: [
					{ required: true, message: '请输入统一社会信用代码', trigger: 'change' },
					{ validator: checkCode, trigger: 'change' }
				]
			},
			hasPostCertificationRequest: false,
			showCancelCertified: false
		}
	},
	computed: {
	},
	watch: {
	},
	mounted () {
		console.log(sessionStorage.getItem('previousLocation'))
		if (window.sessionStorage.getItem('previousLocation') === 'order') {
			this.showCancelCertified = true
		}
	},
	beforeDestroy () {
		console.log(this.hasPostCertificationRequest, '====>')
		if (!this.hasPostCertificationRequest) {
			sessionStorage.removeItem('previousLocation')
		}
	},
	methods: {
		handleCancelCertified () {
			console.log('todo:跳转')
		},
		onSubmit (name1) {
			if (!this.companyInfo.file) {
				this.$refs.uploadLicen.setErrorMsg('请上传工商营业执照')
				return false
			}
			this.$refs[name1].validate(valid => {
				if (valid) {
					console.log('update user info')
					this.postUpdateCompanyInfo()
				} else {
					return false
				}
			})
		},
		postUpdateCompanyInfo () {
			this.$message({
				message: '恭喜你，这是一条成功消息',
				type: 'success',
				offset: 80,
				customClass: 'xx-message-notice'
			})
			this.hasPostCertificationRequest = true
			window.location.href = '/certification'
		}
	}
}
</script>
<style lang="scss" scoped>
h2{
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2C2C2C;
    line-height: 22px;
    .badgeText{
        font-size: 14px;
        font-weight: 400;
        color: #AAAAAA;
        line-height: 20px;
    }
}
</style>
<style lang="scss">
.certificationStep{
    .el-step__head.is-finish{
        color: #2C2C2C;
        border-color: #2C2C2C;
    }
    .el-step__head.is-wait,.el-step__head.is-process{
        color: #AAAAAA;
    }
    .el-step__title{
        font-size: 14px;
        font-weight: 400;
        color: #2C2C2C;
        line-height: 20px;
        &.is-process,&.is-wait{
            color:#AAAAAA;
        }
    }
    .el-step__line{
        background-color: #EEEEEE;
    }
}
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
        &:last-child{
            margin-bottom: 0;
        }
    }
    .el-input,.el-textarea{
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
.stepIcon{
    .el-step__icon.is-icon{
        width: 30px;
        height: 30px;
    }
    .iconfont{
        font-size: 30px;
    }
    .el-step__main {
        margin-top: 4px;
    }
}
.detailedAddress .el-textarea__inner{
    line-height: 20px;
}
</style>