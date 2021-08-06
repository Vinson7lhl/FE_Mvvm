<template>
	<div class='xx-d-flex xx-flex-items-center'>
		<div
			:class='["certificationStatus xx-d-flex xx-flex-items-center xx-justify-center xx-ml-2",
				{
					"pending":certificationStatus===1,
					"approve":certificationStatus===2,
					"reject":certificationStatus===3,
					"none":certificationStatus=== -1
				}]'
		>
			<i class='iconfont icon-a-Group11' />
			<span>{{ msg }}</span>
		</div>
		<div v-if='certificationStatus===3' class='recertification xx-ml-2'>
			<span>{{ errorNoticeText }}</span>
			<el-button type='text' class='custom-el-button-text' @click='goAuthenticationPage'>
				重新认证
			</el-button>
		</div>
	</div>
</template>
<script>
export default {
	name: 'CertifiedBadge',
	props: {
		certificationStatus: {
			type: Number,
			default: -1
		},
		errorMsg: {
			type: String,
			default: ''
		}
	},
	computed: {
		msg () {
			if (this.certificationStatus * 1 === 3) { return '认证未通过' }
			if (this.certificationStatus * 1 === 1) { return '待认证' }
			if (this.certificationStatus * 1 === 2) { return '已认证' }

			return '未认证'
		},
		errorNoticeText () {
			if (this.errorMsg) { return `${this.errorMsg}，请` }
			return '请'
		}
	},
	methods: {
		goAuthenticationPage () {
			const { href } = this.$router.resolve({
				path: '/user/authenticate',
				query: {
					action: 1
				}
			})
			window.location.href = href
		}
	}
}
</script>
<style lang="scss" scoped>
.certificationStatus{
    padding: 8px;
    border: 1px solid #C5C5C5;
    height: 36px;
    min-width: 96px;
    border-radius: 4px;
    color: #999999;
    font-size: 14px;
    font-weight: 500;
    &.pending{
        border-color: #FFA703;
        color: #EB9C00;
    }
    &.approve{
        border-color: #67A92A;
        color: #67A92A;
    }
    &.reject{
        border-color: #F74141;
        color: #F74141;
    }
    &.none{
        border-color: #C5C5C5;
        color: #999999;
    }
    span{
        margin-left: 4px;
    }

}
.custom-el-button-text{
    padding: 0;
    color: #67A92A;
    min-width: unset;
}
.recertification{
    font-size: 14px;
    font-weight: 400;
    color: #999999;
}
i.iconfont{
    font-size: 20px;
}
</style>