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
				<h2>资质文件</h2>
				<div class='infoList xx-mt-3'>
					<div class='xx-d-flex'>
						<div class='infoLabel'>
							工商营业执照
						</div>
						<span v-if='!auditInfo.businessLicense'>---</span>
						<img v-else :src='auditInfo.businessLicense'>
					</div>
					<div class='xx-d-flex xx-mt-2'>
						<div class='infoLabel'>
							企业全称
						</div>
						<span>{{ !!auditInfo.companyName?auditInfo.companyName:'---' }}</span>
					</div>
					<div class='xx-d-flex xx-mt-2'>
						<div class='infoLabel'>
							统一社会信用代码
						</div>
						<span>{{ !!auditInfo.creditCode?auditInfo.creditCode:'---' }}</span>
					</div>
				</div>
			</div>
		</xx-card>

		<xx-card class='xx-b-t'>
			<div>
				<h2>对公银行账号信息</h2>
				<div class='infoList xx-mt-3'>
					<div class='xx-d-flex'>
						<div class='infoLabel'>
							开户名称
						</div>
						<span>{{ !!auditInfo.accountName?auditInfo.accountName:'---' }}</span>
					</div>
					<div class='xx-d-flex xx-mt-2'>
						<div class='infoLabel'>
							开户支行
						</div>
						<span>{{ !!auditInfo.bankName?auditInfo.bankName:'---' }}</span>
					</div>
					<div class='xx-d-flex xx-mt-2'>
						<div class='infoLabel'>
							对公银行账号
						</div>
						<span>{{ !!auditInfo.bankAccount?auditInfo.bankAccount:'---' }}</span>
					</div>
					<div class='xx-d-flex xx-mt-2'>
						<div class='infoLabel'>
							地址
						</div>
						<span> {{ !!auditInfo.detailAddress?auditInfo.detailAddress:'---' }} </span>
					</div>
				</div>
			</div>
		</xx-card>
	</div>
</template>
<script>
export default {
	name: 'CertifiedPage',
	components: {
		'xx-card': () => import('@/components/user/XxCard.vue'),
		'certified-badge': () => import('@/components/user/CertifiedBadge.vue')
	},
	data () {
		return {
			certificationStatus: -1,
			userInfo: null,
			auditInfo: {
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
				// 认证状态
				auditStatus: -1
			}
		}
	},
	created () {
		this.userInfo = this.$cookies.get('user_info')
		this.fetchCertificationInfo()
	},
	methods: {
		fetchCertificationInfo () {
			this.$API_USER().get_authentication_info({
				userId: this.userInfo.userId,
				userMobile: this.userInfo.userMobile
			})
				.then(res => {
					if (res.data) {
						// console.log(res)
						this.auditInfo = { ...res.data }
						this.certificationStatus = this.auditInfo.auditStatus * 1
					}
				})
				.catch(() => {
					// console.log(error, '===>error')
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
}
.infoList{
    padding-left: 16px;
    img{
        width: 128px;
    }
}
.infoLabel{
    margin-right: 32px;
    min-width: 112px;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
}
</style>