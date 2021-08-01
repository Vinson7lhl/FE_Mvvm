<template>
	<!---->
	<div class='notFoundPage'>
		<img src='@/assets/imgs/404.jpg' alt='无此页面' data-hh='dd'>
		<!-- <nuxt-link class='rediectIndexPage' to='/'>
		跳转到首页
		</nuxt-link> -->
		<br>
		<span @click='jumpToIndexPage'>跳转到首页</span>
	</div>
</template>

<script>

export default {
	layout: 'default',
	methods: {
		jumpToIndexPage () {
			this.$router.replace('/')
		}
	}
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
