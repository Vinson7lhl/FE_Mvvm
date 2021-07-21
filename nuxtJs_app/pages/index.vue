<template>
  <div class='indexPage'>
    {{ page_name }}
    需要编译的assets/路径下的图片：<img src='@/assets/imgs/demo_big.jpg'>
    不需要编译的图片static/路径下的图片：<img src='/imgs/Vue.jpg'>
    <div class='imgTest' />
    <span>来自全局store，count：{{ count }}</span>
    <span>来自全局store，state1：{{ state1 }}</span>
    <span @click='getUserName'>来自asyncData：{{ project }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'IndexPage',
	components: {},
	props: [],
	asyncData (context) {
		console.log('server设置cookie-token')
		context.app.$cookies.set('lhl', '阿西吧xxx')
		console.log('server取出cookie-token', context.app.$cookies.get('lhl'))
		context.app.$API_INDEX().get_index_list({ data: { q: 'girls' }, is_token: true }).then(data => {
			console.log('server返回data啦！', data.data[0].id)
		})
		// console.log('服务端测试：', app.API_INDEX.get_index_list())
		// console.log('----', context.app.$_get)
		// const data = await context.app.$axios.get('/api/assets/api/product/getAllModuleProducts')
		// console.log(context)
		// console.log(data)
		// if (data) {
		// 	return { project: data || '哈哈哈' }
		// }
		return { project: '哈哈哈' }
	},
	data () {
		return {
			page_name: '首页'
		}
	},
	computed: {
		test1 () {
			return this.page_name + 'computed'
		},
		...mapState({
			count: state => state.count,
			state1: state => state.state1
		})
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
		this.$API_INDEX().get_index_list({ data: {}, is_token: true }).then(data => {
			console.log('异步返回data：', data.data)
		})
		console.log('设置cookie-token')
		this.$cookies.set('lhl2', '阿西吧xxx2')
		console.log('server取出cookie-token', this.$cookies.get('lhl'))
		console.log('取出cookie-token', this.$cookies.get('lhl2'))
		// console.log('客户端测试：', Vue, INDEX_API.GET_LIST())
		// this.$axios.get('/api/assets/api/product/getAllModuleProducts')
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

<style lang='scss' scoped>
.indexPage {
    font-size:28px;
    .imgTest{
        width:100px;
        height:100px;
        background-image: url('@/assets/imgs/demo_big.jpg');
    }
}
</style>
