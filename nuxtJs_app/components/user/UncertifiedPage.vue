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
						<el-form-item label='工商营业执照' prop='businessLicense' class='xx-d-flex'>
							<upload-license ref='uploadLicen' v-model='companyInfo.businessLicense' />
						</el-form-item>
						<el-form-item label='企业全称' prop='companyName' class='xx-d-flex xx-flex-items-center'>
							<el-input v-model='companyInfo.companyName' placeholder='需与营业执照照片保持一致' />
						</el-form-item>
						<el-form-item label='统一社会信用代码' prop='creditCode' class='xx-d-flex xx-flex-items-center'>
							<el-input v-model='companyInfo.creditCode' placeholder='需与营业执照上的注册号或统一社会信用代码一致' />
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
					<el-input v-model='companyInfo.bankName' placeholder='需与公司银行账号开户银行的名称一致' />
				</el-form-item>
				<el-form-item label='对公银行账号' class='xx-d-flex xx-flex-items-center'>
					<el-input v-model='companyInfo.bankAccount' placeholder='需与与公司主体的银行账号一致' />
				</el-form-item>
				<el-form-item label='地址' class='xx-d-flex xx-flex-items-center'>
					<!-- <el-input v-model='companyInfo.adress' placeholder='用于发票寄送的地址信息' /> -->
					<el-cascader
						v-model='companyInfo.invoiceAddress'
						:options='adressList'
						placeholder='用于发票寄送的地址信息'
						@change='handleAdressChange'
					/>
				</el-form-item>
				<el-form-item label='详细地址' class='xx-d-flex'>
					<el-input
						v-model='companyInfo.detailAddress'
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
			certificationStatus: -1,
			step: 1,
			companyInfo: {
				// 营业执照
				businessLicense: '',
				// 统一社会信用代码
				creditCode: '',
				// 企业全称
				companyName: '',
				// 开户名称
				accountName: '',
				// 开户银行
				bankName: '',
				// 对公银行账号
				bankAccount: '',
				// 详细地址
				detailAddress: '',
				// 地址
				invoiceAddress: [],
				// 认证状态
				auditStatus: 1,
				userId: '',
				userMobile: ''
			},
			rules: {
				companyName: [
					{ required: true, message: '请输入企业名称', trigger: 'change' },
					{ max: 30, message: '最大长度为30个字符', trigger: 'change' }
				],
				creditCode: [
					{ required: true, message: '请输入统一社会信用代码', trigger: 'change' },
					{ validator: checkCode, trigger: 'change' }
				]
			},
			hasPostCertificationRequest: false,
			showCancelCertified: false,
			adressList: [{
				value: 'zhinan',
				label: '指南',
				children: [{
					value: 'shejiyuanze',
					label: '设计原则',
					children: [{
						value: 'yizhi',
						label: '一致'
					}, {
						value: 'fankui',
						label: '反馈'
					}, {
						value: 'xiaolv',
						label: '效率'
					}, {
						value: 'kekong',
						label: '可控'
					}]
				}, {
					value: 'daohang',
					label: '导航',
					children: [{
						value: 'cexiangdaohang',
						label: '侧向导航'
					}, {
						value: 'dingbudaohang',
						label: '顶部导航'
					}]
				}]
			}, {
				value: 'zujian',
				label: '组件',
				children: [{
					value: 'basic',
					label: 'Basic',
					children: [{
						value: 'layout',
						label: 'Layout 布局'
					}, {
						value: 'color',
						label: 'Color 色彩'
					}, {
						value: 'typography',
						label: 'Typography 字体'
					}, {
						value: 'icon',
						label: 'Icon 图标'
					}, {
						value: 'button',
						label: 'Button 按钮'
					}]
				}, {
					value: 'form',
					label: 'Form',
					children: [{
						value: 'radio',
						label: 'Radio 单选框'
					}, {
						value: 'checkbox',
						label: 'Checkbox 多选框'
					}, {
						value: 'input',
						label: 'Input 输入框'
					}, {
						value: 'input-number',
						label: 'InputNumber 计数器'
					}, {
						value: 'select',
						label: 'Select 选择器'
					}, {
						value: 'cascader',
						label: 'Cascader 级联选择器'
					}, {
						value: 'switch',
						label: 'Switch 开关'
					}, {
						value: 'slider',
						label: 'Slider 滑块'
					}, {
						value: 'time-picker',
						label: 'TimePicker 时间选择器'
					}, {
						value: 'date-picker',
						label: 'DatePicker 日期选择器'
					}, {
						value: 'datetime-picker',
						label: 'DateTimePicker 日期时间选择器'
					}, {
						value: 'upload',
						label: 'Upload 上传'
					}, {
						value: 'rate',
						label: 'Rate 评分'
					}, {
						value: 'form',
						label: 'Form 表单'
					}]
				}, {
					value: 'data',
					label: 'Data',
					children: [{
						value: 'table',
						label: 'Table 表格'
					}, {
						value: 'tag',
						label: 'Tag 标签'
					}, {
						value: 'progress',
						label: 'Progress 进度条'
					}, {
						value: 'tree',
						label: 'Tree 树形控件'
					}, {
						value: 'pagination',
						label: 'Pagination 分页'
					}, {
						value: 'badge',
						label: 'Badge 标记'
					}]
				}, {
					value: 'notice',
					label: 'Notice',
					children: [{
						value: 'alert',
						label: 'Alert 警告'
					}, {
						value: 'loading',
						label: 'Loading 加载'
					}, {
						value: 'message',
						label: 'Message 消息提示'
					}, {
						value: 'message-box',
						label: 'MessageBox 弹框'
					}, {
						value: 'notification',
						label: 'Notification 通知'
					}]
				}, {
					value: 'navigation',
					label: 'Navigation',
					children: [{
						value: 'menu',
						label: 'NavMenu 导航菜单'
					}, {
						value: 'tabs',
						label: 'Tabs 标签页'
					}, {
						value: 'breadcrumb',
						label: 'Breadcrumb 面包屑'
					}, {
						value: 'dropdown',
						label: 'Dropdown 下拉菜单'
					}, {
						value: 'steps',
						label: 'Steps 步骤条'
					}]
				}, {
					value: 'others',
					label: 'Others',
					children: [{
						value: 'dialog',
						label: 'Dialog 对话框'
					}, {
						value: 'tooltip',
						label: 'Tooltip 文字提示'
					}, {
						value: 'popover',
						label: 'Popover 弹出框'
					}, {
						value: 'card',
						label: 'Card 卡片'
					}, {
						value: 'carousel',
						label: 'Carousel 走马灯'
					}, {
						value: 'collapse',
						label: 'Collapse 折叠面板'
					}]
				}]
			}, {
				value: 'ziyuan',
				label: '资源',
				children: [{
					value: 'axure',
					label: 'Axure Components'
				}, {
					value: 'sketch',
					label: 'Sketch Templates'
				}, {
					value: 'jiaohu',
					label: '组件交互文档'
				}]
			}],
			userInfo: null
		}
	},
	computed: {
	},
	watch: {
	},
	created () {
		this.userInfo = this.$cookies.get('user_info')
		this.certificationStatus = this.userInfo ? this.userInfo.auditStatus * 1 : -1
		if (this.userInfo) {
			this.companyInfo.userId = this.userInfo.userId
			this.companyInfo.userMobile = this.userInfo.userMobile
		}
	},
	mounted () {
		setTimeout(() => {
			if (window.sessionStorage.getItem('previousLocation') === 'order') {
				this.showCancelCertified = true
			}
		}, 0)
	},
	beforeDestroy () {
		if (!this.hasPostCertificationRequest) {
			sessionStorage.removeItem('previousLocation')
		}
	},
	methods: {
		handleCancelCertified () {
			console.log('todo:跳转')
		},
		onSubmit (name1) {
			if (!this.companyInfo.businessLicense) {
				this.$refs.uploadLicen.setErrorMsg('请上传工商营业执照')
				return false
			}
			this.$refs[name1].validate(valid => {
				if (valid) {
					this.postUpdateCompanyInfo()
				} else {
					return false
				}
			})
		},
		postUpdateCompanyInfo () {
			this.$API_USER().post_authentication(this.companyInfo)
				.then(() => {
					this.hasPostCertificationRequest = true
					window.location.href = '/certification'
				})
				.catch(error => {
					console.log(error, '===>error')
				})
		},
		handleAdressChange (val) {
			console.log(val, 'change adress')
		},
		fetchCertificationInfo () {
			this.$API_USER().get_authentication_info({
				userId: this.companyInfo.userId,
				userMobile: this.companyInfo.userMobile
			})
				.then(res => {
					if (res.data) {
						// console.log(res)
						this.companyInfo = { ...res.data }
						this.certificationStatus = this.companyInfo.auditStatus * 1
					}
				})
				.catch(() => {
				})
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
    .el-input,.el-textarea,.el-cascader{
        width: 100%;
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