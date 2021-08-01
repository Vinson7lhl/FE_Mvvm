<template>
	<div class='xx-d-flex xx-flex-items-center'>
		<div
			:class='["certificationStatus xx-d-flex xx-flex-items-center xx-justify-center xx-ml-2",
				{
					"pending":certificationStatus===0,
					"approve":certificationStatus===1,
					"reject":certificationStatus===2,
					"none":certificationStatus===3
				}]'
		>
			<img src='/imgs/icon/authentication_grey.png'>
			<span>{{ msg }}</span>
		</div>
		<div v-if='certificationStatus===2' class='recertification xx-ml-2'>
			<span>您提交的认证没有加盖公章，请</span>
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
			default: 3
		}
	},
	computed: {
		msg () {
			if (this.certificationStatus === 0) { return '待认证' }
			if (this.certificationStatus === 1) { return '已认证' }
			if (this.certificationStatus === 2) { return '认证未通过' }

			return '未认证'
		}
	},
	methods: {
		goAuthenticationPage () {
			console.log('gogogo')
		}
	}
}
</script>
<style lang="scss" scoped>
.certificationStatus{
    padding: 8px;
    border: 1px solid;
    height: 36px;
    min-width: 96px;
    border-radius: 4px;
    background: #FFFFFF;
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
</style>