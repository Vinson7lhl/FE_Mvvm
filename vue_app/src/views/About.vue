<template>
	<div class="about">
		<h1 @click="changeConent">This is an about page</h1>
		<div>
			{{content}}
			<br />
			<img src="../assets/img/async.jpg" alt />
			<div class="tabList">
				<router-link class="aboutTab" to="/about/2/us">关于我们</router-link>
				<router-link class="aboutTab" to="/about/3/firm">关于公司</router-link>
			</div>
			<button @click='updateRoute'>测试beforeRouteUpdate</button>
			<button @click='updateRoute2'>测试beforeRouteUpdate2</button>
			<Pure />
			<transition name="fade">
				<!--路由的输出-->
				<div class="childrenRoute">
					<router-view />
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
import Pure from '@/components/pureComp/pure'
export default {
	name: 'about-page',
	components: {
		Pure
	},
	data () {
		return {
			content: ['你好', '啊——', '李银河']
		}
	},
	mounted () {
		let obj_1 = this.factoryObj('张三', 41)
		let obj_2 = this.factoryObj('李四', 27)
		console.log(obj_1 === obj_2)
	},
	beforeRouteUpdate (to, from, next) {
		console.log('beforeRouteUpdate About.vue')
		next()
	},
	beforeRouteLeave (to, from, next) {
		console.log('beforeRouteLeave About.vue')
		next()
	},
	methods: {
		routeChange () {
			console.log('About路由变化')
		},
		changeConent () {
			// this.content[2] = '王小波'
			this.$set(this.content, 2, '王小波')
		},
		// 工厂函数
		factoryObj (name, age) {
			let obj = {
				name: name,
				age: age
			}
			return obj
		},
		updateRoute () {
			this.$router.push('/about/1/us?name=update1')
		},
		updateRoute2 () {
			this.$router.push('/about/1/us?name=update2')
		}
	}
}
</script>

<style lang="scss" scoped>
	.tabList {
		overflow: hidden;
		width: 200px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100px;
		.aboutTab {
			float: left;
			width: 100px;
			text-align: center;
			line-height: 50px;
			background-color: #4e4e4e;
			color: #ffffff;
			transition: all 0.3s;
			text-decoration: none;
		}
		.aboutTab:hover {
			background-color: #000000;
		}
	}
	.childrenRoute {
		text-align: center;
		font-weight: bold;
		margin-top: 50px;
	}
</style>
