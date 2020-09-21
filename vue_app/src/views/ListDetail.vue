<template>
	<div>
		<div>电影Id：{{$route.params.id}}</div>
		<div>得分score：{{$route.params.score}}</div>
	</div>
</template>

<script>
/**
 * 路由参数：this.$route.params.id => /detail/:id
 */
export default {
	name: 'product_detail',
	data () {
		return {}
	},
	mounted () {
		console.log('id：类型', typeof this.$route.params.id)
		console.log('score：类型', typeof this.$route.params.score)
	}
}
</script>
