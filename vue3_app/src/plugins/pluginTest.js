// 导入基本功能函数集合
import baseFuns from './baseFuns'

// 构建插件基本结构
const plugins = {
	install: (app, opt) => {
		// 全局可以通过 this.$fun_1(str)调用
		app.config.globalProperties.$fun_1 = baseFuns.fun_1
	}
}

export default plugins