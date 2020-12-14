<template>
	<div>这里是pure组件</div>
</template>

<script>
export default {
	// 组件上的属性
	props: {},
	/**
	 * 状态，必须是函数，然后返回状态，而不可以直接映射json对象
	 */
	data () {
		return {}
	},
	beforeRouteUpdate (to, from, next) {
		console.log('beforeRouteUpdate pure.vue')
		next()
	},
	// 0
	beforeRouteLeave (to, from, next) {
		console.log('pure-beforeRouteLeave')
		next()
	},
	// 1(第一次进入)
	beforeRouteEnter (to, from, next) {
		console.log('pure-beforeRouteEnter')
		next()
	},
	mounted () {
		console.log('mounted , pure')
	},
	/**
	 * 函数
	 */
	methods: {},
	components: {}
}
</script>
