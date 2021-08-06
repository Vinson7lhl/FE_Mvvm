<template>
	<!---->
	<div class='notFoundPage'>
		<h1 v-if='error.statusCode === 404'>
			<img src='@/assets/imgs/404.jpg' alt='404' data-hh='dd'>
		</h1>
		<h1 v-else>
			<img src='@/assets/imgs/500.jpg' alt='500' data-hh='dd'>
		</h1>
		<nuxt-link to='/'>
			返 回 首 页
		</nuxt-link>
	</div>
</template>

<script>

export default {
	props: ['error'],
	mounted () {
		console.log('Erroe-page：', this.error)
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
.notFoundPage{
    text-align: center;
}
.rediectIndexPage{
    color:red;
}
</style>
