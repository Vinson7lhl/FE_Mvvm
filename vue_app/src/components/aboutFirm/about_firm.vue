<template>
	<div>这里是公司简介
		<button @click='add'>增加+1</button>
		<button @click='minus'>减少-1</button>
	</div>
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
	mounted () {
		console.log('mounted , about_firm')
	},
	beforeRouteUpdate () {
		console.log('beforeRouteUpdate about_firm.vue')
	},
	/**
	 * 函数
	 */
	methods: {
		add () {
			this.$store.commit('add', '这里是add的载入数据')
		},
		minus () {
			this.$store.commit('minus', '这里是minus的载入数据')
		}
	},
	components: {}
}
</script>
