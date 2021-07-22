<template>
  <div>login页面</div>
</template>

<script>
export default {
	data () {
		return {
			page_title: '登陆'
		}
	},
	head () {
		return {
			title: this.page_title
		}
	},
	mounted () {
		this.page_title = '登陆2'
	}
}
</script>
