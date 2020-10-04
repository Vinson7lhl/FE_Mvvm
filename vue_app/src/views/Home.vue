<template>
	<div class="home">
		<img src="../assets/logo.png" />
		<button @click="triggerSonFocus">点击触发子组件input的Focus</button>
		<hello-world ref="childComponent" @emitFather="fatherEmit" data-msg="Father-Tmplate" />
		<about-us />
		<button @click='changeRoute'>触发绑定</button>
	</div>
</template>

<script>
// @ is an alias to /src，@ 是'/src'的别名
import HelloWorld from '@/components/HelloWorld/HelloWorld.vue'
import AboutUs from '@/components/aboutUs/about_us.vue'
import $Vue from './vueInstance'
export default {
	name: 'home',
	methods: {
		fatherEmit (data1, data2, data3) {
			console.log('来自子组建的数据1：' + data1)
			console.log('来自子组建的数据2：' + data2)
			console.log(data3.target)
		},
		triggerSonFocus () {
			this.$refs.childComponent.beFocused()
		},
		changeRoute () {
			$Vue.$emit('test')
		}
	},
	data () {
		return {
			homeData: 'Home页面数据'
		}
	},
	components: {
		'hello-world': HelloWorld,
		'about-us': AboutUs
		// 或者只写HelloWorld也可以相当于-HelloWorld:HelloWorld
	},
	beforeCreate () {
		console.log('---Home:beforeCreate---')
		console.log('$el', this.$el)
		console.log('homeData', this.$data)
	},
	created () {
		console.log('---Home:created---')
		console.log('$el', this.$el)
		console.log('homeData', this.$data)
	},
	beforeMount () {
		console.log('---Home:beforeMount---')
		console.log('$el', this.$el)
		console.log('homeData', this.$data)
	},
	mounted () {
		console.log('---Home:mounted---')
		console.log('$el', this.$el)
		console.log('homeData', this.$data)
		console.log('子组件访问Home页面数据：', this.$parent.homeData)
	}
}
</script>
