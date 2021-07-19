// 此文件为基本函数功能，用于注入到全局过滤器或者插件中
export default {
	fun_1: str => {
		if (str) {
			return `hello${str}`
		} else {
			return '--'
		}
	}
}