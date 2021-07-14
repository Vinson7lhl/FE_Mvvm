<template>
  <div class="test">
    {{ page_name }}
    需要编译的assets/路径下的图片：<img src="@/assets/imgs/demo_big.jpg">
    不需要编译的图片static/路径下的图片：<img src="/imgs/Vue.jpg">
    <div class="imgTest" />
  </div>
</template>

<script>

export default {
	name: 'IndexPage',
	components: {},
	props: [],
	data () {
		return {
			page_name: '首页'
		}
	},
	beforeCreate () {
		console.log('index:beforeCreate')
	},
	created () {
		console.log('index:created')
	},
	beforeMount () {
		console.log('index:beforeMount')
	},
	mounted () {
		console.log('index:mounted')
	},
	methods: {
		/**
       * @description 获取用户名
       */
		getUserName () {
			alert(this.user_name)
		}
	}
}
</script>

<style lang="scss" scoped>
.test {
    font-size:28px;
    .imgTest{
        width:100px;
        height:100px;
        background-image: url('@/assets/imgs/demo_big.jpg');
    }
}
</style>
