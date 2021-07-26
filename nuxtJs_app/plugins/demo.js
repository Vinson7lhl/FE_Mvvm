/**
 * 此为插件demo，分为两种写法
 * （1）只在Vue实例-客户端中使用 Vue.prototype.$XXX
 * （2）只在server端用
 * （3）两端同时用
 */

export default ({ app }, inject) => {
	// 只在server端
	app.$fun_1 = str => {
		// 做点啥
		return `仅server ---${str}`
	}
	// server 端和 client都可以用
	inject('fun_2', str => {
		// 做点啥
		return `server + client---${str}`
	})
}
