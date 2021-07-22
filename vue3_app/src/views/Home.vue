<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" />
		<OtherComp />
		<input type='text' v-focus>
        <div>另一个根节点
            <input type='text' v-focus>
            <span>{{new_name}}</span>
        </div>
        <div class='iconDemo'>
            饿了么icondemo：<i class="el-icon-edit"></i>
        </div>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/index-page/HelloWorld.vue'
// import OtherComp from '@/components/other-page/OtherPage.vue'

import { defineAsyncComponent } from 'vue'

export default {
	name: 'Home',
	components: {
		HelloWorld,
		// 异步导入组件
		OtherComp: defineAsyncComponent(() =>
			import('@/components/other-page/OtherPage.vue'))
	},
	// 局部指令
	directives: {
		focus: {
			// 指令的定义
			mounted (el) {
				el.focus()
			}
		}
	},
	data () {
		return {
			name: '欧阳锋',
			multi_deep_data: '徐霞客'
		}
	},
	computed: {
		new_name () {
			return this.$fun_1(this.name)
		}
	},
	// provide 注入多层次组件数据，如果依赖data则必须以函数形式体现
	provide () {
		return {
			multi_deep_data: this.multi_deep_data
		}
	},
	mounted () {
		console.log('this.$data.name', this.$data.name)
	}
}
</script>

<style lang="scss" scoped>
.home {
    .iconDemo{
        background-color: azure;
        text-align: center;
    }
}
</style>
