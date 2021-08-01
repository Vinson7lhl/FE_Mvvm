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
						<img src='/imgs/icon/test.jpeg'>
					</div>
					<div class='xx-d-flex xx-mt-2'>
						<div class='infoLabel'>
							企业全称
						</div>
						<span>上海箱箱智能科技有限公司</span>
					</div>
					<div class='xx-d-flex xx-mt-2'>
						<div class='infoLabel'>
							统一社会信用代码
						</div>
						<span>4301110000888888</span>
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
						<span>招商银行</span>
					</div>
					<div class='xx-d-flex xx-mt-2'>
						<div class='infoLabel'>
							开户支行
						</div>
						<span>上海晨会支行</span>
					</div>
					<div class='xx-d-flex xx-mt-2'>
						<div class='infoLabel'>
							对公银行账号
						</div>
						<span>---</span>
					</div>
					<div class='xx-d-flex xx-mt-2'>
						<div class='infoLabel'>
							地址
						</div>
						<span>---</span>
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
			certificationStatus: 2
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