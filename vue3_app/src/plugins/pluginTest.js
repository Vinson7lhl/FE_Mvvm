// 导入基本功能函数集合
import baseFuns from './baseFuns'

// 构建插件基本结构，用来替换Vue.prototype.属性/方法
const plugins = {
	install: (app, opt) => {
		// 全局可以通过 this.$fun_1(str)调用
		app.config.globalProperties.$fun_1 = baseFuns.fun_1
		// 其它全局函数 / 属性
	}
}

export default plugins