<template>
	<div
		:class='["authentication xx-pl-2 xx-d-flex xx-flex-items-center", {
			"pending":status===1,
			"approve":status===2,
			"reject":status===3,
			"none":status=== -1
		}]'
	>
		<i class='iconfont icon-a-Group11' />
		<span class='xx-ml-1'>{{ msg }}</span>
		<el-button v-if='status === -1 || status === 3' type='text' :class='["custom-el-button-text xx-ml-1",{"reject":status === 3}]' @click='goAuthenticationPage'>
			<span class='xx-d-flex xx-flex-items-center'>
				<span v-if='status === -1'>去认证</span>
				<span v-if='status === 3'>重新认证</span>
				<i class='iconfont icon-a-Group29 rightArrow' />
			</span>
		</el-button>
	</div>
</template>
<script>
export default {
	name: 'XxAuthenticationNotice',
	props: {
		status: {
			type: Number,
			default: -1
		}
	},
	computed: {
		msg () {
			if (this.status === -1) { return '未认证，认证后获得企业级会员价' }
			if (this.status * 1 === 1) { return '待认证' }
			if (this.status * 1 === 2) { return '已认证' }
			return '认证未通过'
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
			sessionStorage.setItem('/user')
			window.open(href, '_blank')
		}
	}
}
</script>
<style lang="scss" scoped>
.custom-el-button-text{
    padding: 0;
    color: #0E7AFF;
    min-width: unset;
    &.reject{
        color: #67A92A;
    }
}
.authentication{
    &.pending{
        color: #EB9C00;
    }
    &.approve{
        color: #67A92A;
    }
    &.reject{
        color: #F74141;
    }
    &.none{
        color: #999999;
    }
}
.iconfont{
    font-size: 20px;
    &.rightArrow{
        margin-left: 4px;
        font-size: 16px;
    }
}
</style>>