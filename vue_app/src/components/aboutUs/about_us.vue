<template>
	<div>这里是我的简介</div>
</template>

<script>
import $Vue from '@/views/vueInstance.js'
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
		console.log('beforeRouteUpdate --- about_us.vue')
		next()
	},
	// 0
	beforeRouteLeave (to, from, next) {
		console.log('beforeRouteLeave --- about_us.vue')
		next()
	},
	// 1(第一次进入)
	beforeRouteEnter (to, from, next) {
		console.log('beforeRouteEnter --- about_us.vue')
		next()
	},
	mounted () {
		console.log('mounted , about_us')
		$Vue.$on('test', () => {
			console.log('publicOn')
		})
	},
	/**
	 * 函数
	 */
	methods: {},
	components: {}
}
</script>
