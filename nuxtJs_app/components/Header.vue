<template>
  <div class='headerModel' @click='getUserName'>
    这里是头部，登陆人{{ login_name }}
  </div>
</template>

<script>
export default {
	name: 'HeaderModel',
	props: [],
	data () {
		return {
			login_name: '欧阳锋'
		}
	},
	beforeCreate () {
		console.log('header:beforeCreate')
	},
	created () {
		console.log('header:created')
	},
	beforeMount () {
		console.log('header:beforeMount')
	},
	mounted () {
		console.log('header:mounted')
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
    .headerModel {
        width:100%;
        height:100px;
        background-color: burlywood;
    }
</style>
