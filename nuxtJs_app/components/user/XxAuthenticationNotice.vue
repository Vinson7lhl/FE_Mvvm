<template>
	<div :class='["authentication xx-pl-2 xx-d-flex xx-flex-items-center", {"active":!!authentication}]'>
		<i class='iconfont icon-a-Group11' />
		<span class='xx-ml-1'>{{ msg }}</span>
		<el-button v-if='!authentication' type='text' class='custom-el-button-text xx-ml-1' @click='goAuthenticationPage'>
			<span class='xx-d-flex xx-flex-items-center'>
				<span>去认证</span>
				<img src='/imgs/icon/arrow_right_primary.png'>
			</span>
		</el-button>
	</div>
</template>
<script>
export default {
	name: 'XxAuthenticationNotice',
	props: {
		authentication: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		msg () {
			if (this.authentication) { return '已认证' }
			return '未认证，认证后获得企业级会员价'
		}
	},
	methods: {
		goAuthenticationPage () {
			console.log('gogogo===>')
		}
	}
}
</script>
<style lang="scss" scoped>
.custom-el-button-text{
    padding: 0;
    color: #0E7AFF;
    min-width: unset;
}
.authentication.active{
    color: #67A92A;
}
.iconfont{
    font-size: 20px;
}
</style>>