<!--登录page-->
<template>
	<CompLogin />
</template>

<script>
// 导入登录+注册组件
import CompLogin from '@/components/login/CompLogin'
export default {
	components: { CompLogin },
	layout: 'login',
	data () {
		return {
		}
	},
	head () {
		return {
			title: '请登陆'
		}
	},
	methods: {
	}
}
</script>
